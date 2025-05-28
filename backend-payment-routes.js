// Sleep Haven Production Backend Payment Integration
// This file contains the server-side payment processing for all payment methods
// Including PayPal, Credit Cards (Stripe), Apple Pay, and Google Pay

const express = require('express');
const router = express.Router();
const paypal = require('@paypal/checkout-server-sdk');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sgMail = require('@sendgrid/mail');
const { generateReceiptHTML, generateReceiptPDF } = require('../utils/receiptGenerator');
const Payment = require('../models/Payment');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Configure PayPal
let paypalClient;
if (process.env.NODE_ENV === 'production') {
  // Live PayPal environment
  const liveClient = new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );
  paypalClient = new paypal.core.PayPalHttpClient(liveClient);
} else {
  // Sandbox PayPal environment for development
  const sandboxClient = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );
  paypalClient = new paypal.core.PayPalHttpClient(sandboxClient);
}

// Create PayPal Order
router.post('/create-paypal-order', async (req, res) => {
  try {
    const { planId, amount, currency } = req.body;
    
    // Validate inputs
    if (!planId || !amount || !currency) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Create PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: planId,
        description: 'Sleep Haven Plan',
        amount: {
          currency_code: currency.toUpperCase(),
          value: amount.toString()
        }
      }]
    });
    
    // Execute request
    const order = await paypalClient.execute(request);
    
    // Return order ID to client
    return res.status(200).json({
      id: order.result.id,
      status: order.result.status
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return res.status(500).json({ error: 'Failed to create PayPal order' });
  }
});

// Capture PayPal Order
router.post('/capture-paypal-order', async (req, res) => {
  try {
    const { orderId } = req.body;
    
    // Validate input
    if (!orderId) {
      return res.status(400).json({ error: 'Missing order ID' });
    }
    
    // Create capture request
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.prefer('return=representation');
    
    // Execute request
    const capture = await paypalClient.execute(request);
    const captureData = capture.result;
    
    // Extract payment details
    const paymentDetails = {
      transactionId: captureData.id,
      paymentMethod: 'paypal',
      amount: captureData.purchase_units[0].payments.captures[0].amount.value,
      currency: captureData.purchase_units[0].payments.captures[0].amount.currency_code,
      status: captureData.status,
      payerEmail: captureData.payer.email_address,
      payerName: `${captureData.payer.name.given_name} ${captureData.payer.name.surname}`,
      timestamp: new Date()
    };
    
    // Save payment record to database
    await savePaymentRecord(paymentDetails);
    
    // Send receipt email
    await sendReceiptEmail(paymentDetails);
    
    // Return capture data to client
    return res.status(200).json({
      id: captureData.id,
      status: captureData.status,
      payerEmail: captureData.payer.email_address
    });
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    return res.status(500).json({ error: 'Failed to capture PayPal payment' });
  }
});

// Create Stripe Payment Intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { paymentMethodId, planId, amount, currency, customerDetails } = req.body;
    
    // Validate inputs
    if (!paymentMethodId || !planId || !amount || !currency) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Create or retrieve customer
    let customer;
    if (customerDetails && customerDetails.email) {
      // Check if customer already exists
      const customers = await stripe.customers.list({
        email: customerDetails.email,
        limit: 1
      });
      
      if (customers.data.length > 0) {
        customer = customers.data[0];
      } else {
        // Create new customer
        customer = await stripe.customers.create({
          email: customerDetails.email,
          name: customerDetails.name,
          payment_method: paymentMethodId
        });
      }
    }
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      payment_method: paymentMethodId,
      customer: customer ? customer.id : undefined,
      confirm: true,
      description: `Sleep Haven Plan - ${planId}`,
      metadata: {
        planId: planId
      },
      receipt_email: customerDetails.email,
      payment_method_types: ['card'],
      return_url: 'https://sleephaven.ai/payment-success'
    });
    
    // Handle payment intent status
    if (paymentIntent.status === 'succeeded') {
      // Extract payment details
      const paymentDetails = {
        transactionId: paymentIntent.id,
        paymentMethod: 'stripe',
        amount: amount,
        currency: currency.toUpperCase(),
        status: paymentIntent.status,
        payerEmail: customerDetails.email,
        payerName: customerDetails.name,
        timestamp: new Date()
      };
      
      // Save payment record to database
      await savePaymentRecord(paymentDetails);
      
      // Send receipt email
      await sendReceiptEmail(paymentDetails);
      
      // Return success to client
      return res.status(200).json({
        id: paymentIntent.id,
        status: paymentIntent.status
      });
    } else if (paymentIntent.status === 'requires_action') {
      // Return client secret for 3D Secure authentication
      return res.status(200).json({
        requiresAction: true,
        clientSecret: paymentIntent.client_secret
      });
    } else {
      // Payment failed
      return res.status(400).json({
        error: 'Payment failed',
        status: paymentIntent.status
      });
    }
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error);
    return res.status(500).json({ error: 'Failed to process payment' });
  }
});

// Stripe webhook handler
router.post('/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    // Handle specific events
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('Payment succeeded:', paymentIntent.id);
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('Payment failed:', failedPayment.id, failedPayment.last_payment_error?.message);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error handling Stripe webhook:', error);
    res.status(400).json({ error: 'Webhook signature verification failed' });
  }
});

// Get payment history (requires authentication)
router.get('/history', auth, async (req, res) => {
  try {
    // Get user ID from auth middleware
    const userId = req.user.id;
    
    // Find payments for this user
    const payments = await Payment.find({ userId }).sort({ timestamp: -1 });
    
    // Return payment history
    return res.status(200).json(payments);
  } catch (error) {
    console.error('Error retrieving payment history:', error);
    return res.status(500).json({ error: 'Failed to retrieve payment history' });
  }
});

// Get payment receipt (requires authentication)
router.get('/receipt/:transactionId', auth, async (req, res) => {
  try {
    const { transactionId } = req.params;
    const userId = req.user.id;
    
    // Find payment record
    const payment = await Payment.findOne({ transactionId, userId });
    
    if (!payment) {
      return res.status(404).json({ error: 'Payment record not found' });
    }
    
    // Generate receipt PDF
    const receiptPdf = await generateReceiptPDF(payment);
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="receipt-${transactionId}.pdf"`);
    
    // Send PDF
    return res.send(receiptPdf);
  } catch (error) {
    console.error('Error generating receipt:', error);
    return res.status(500).json({ error: 'Failed to generate receipt' });
  }
});

// Helper function to save payment record
async function savePaymentRecord(paymentDetails) {
  try {
    // Create new payment record
    const payment = new Payment({
      transactionId: paymentDetails.transactionId,
      paymentMethod: paymentDetails.paymentMethod,
      amount: paymentDetails.amount,
      currency: paymentDetails.currency,
      status: paymentDetails.status,
      payerEmail: paymentDetails.payerEmail,
      payerName: paymentDetails.payerName,
      timestamp: paymentDetails.timestamp
    });
    
    // Save to database
    await payment.save();
    
    console.log('Payment record saved:', payment.transactionId);
    return payment;
  } catch (error) {
    console.error('Error saving payment record:', error);
    throw error;
  }
}

// Helper function to send receipt email
async function sendReceiptEmail(paymentDetails) {
  try {
    // Generate receipt HTML
    const receiptHtml = generateReceiptHTML(paymentDetails);
    
    // Generate receipt PDF
    const receiptPdf = await generateReceiptPDF(paymentDetails);
    
    // Prepare email
    const msg = {
      to: paymentDetails.payerEmail,
      from: 'receipts@sleephaven.ai',
      subject: 'Your Sleep Haven Receipt',
      text: `Thank you for your purchase! Transaction ID: ${paymentDetails.transactionId}`,
      html: receiptHtml,
      attachments: [
        {
          content: receiptPdf.toString('base64'),
          filename: `receipt-${paymentDetails.transactionId}.pdf`,
          type: 'application/pdf',
          disposition: 'attachment'
        }
      ]
    };
    
    // Send email
    await sgMail.send(msg);
    
    console.log('Receipt email sent to:', paymentDetails.payerEmail);
    return true;
  } catch (error) {
    console.error('Error sending receipt email:', error);
    throw error;
  }
}

module.exports = router;
