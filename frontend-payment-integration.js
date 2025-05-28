// Sleep Haven Production Payment Integration
// This file contains the unified payment processing for all payment methods
// Including PayPal, Credit Cards (Stripe), Apple Pay, and Google Pay

// Production API URL
const API_BASE_URL = 'https://api.sleephaven.ai';

// Payment configuration
const PAYMENT_CONFIG = {
  // PayPal configuration
  paypal: {
    clientId: 'PAYPAL_LIVE_CLIENT_ID', // To be replaced with actual credentials
    currency: 'USD',
    intent: 'capture'
  },
  
  // Stripe configuration for credit cards, Apple Pay, and Google Pay
  stripe: {
    publishableKey: 'STRIPE_LIVE_PUBLISHABLE_KEY', // To be replaced with actual credentials
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#4a6da7', // Sleep Haven blue
        colorBackground: '#ffffff',
        colorText: '#32325d',
        colorDanger: '#ff5252',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        borderRadius: '4px'
      }
    }
  }
};

// Initialize payment methods
async function initializePayments() {
  // Initialize PayPal
  await loadPayPalScript();
  
  // Initialize Stripe
  const stripe = await loadStripeScript();
  
  // Initialize payment form
  initializePaymentForm(stripe);
  
  // Return initialized payment processors
  return {
    paypal: window.paypal,
    stripe: stripe
  };
}

// Load PayPal JavaScript SDK
function loadPayPalScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYMENT_CONFIG.paypal.clientId}&currency=${PAYMENT_CONFIG.paypal.currency}`;
    script.onload = () => resolve(window.paypal);
    script.onerror = (err) => reject(new Error('Failed to load PayPal SDK'));
    document.body.appendChild(script);
  });
}

// Load Stripe JavaScript SDK
function loadStripeScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.onload = () => resolve(Stripe(PAYMENT_CONFIG.stripe.publishableKey));
    script.onerror = (err) => reject(new Error('Failed to load Stripe SDK'));
    document.body.appendChild(script);
  });
}

// Initialize the payment form with all payment options
function initializePaymentForm(stripe) {
  // Get form elements
  const paymentForm = document.getElementById('payment-form');
  const paymentMethodButtons = document.getElementById('payment-method-buttons');
  const cardElement = document.getElementById('card-element');
  const paypalButtonContainer = document.getElementById('paypal-button-container');
  const applePayButtonContainer = document.getElementById('apple-pay-button-container');
  const googlePayButtonContainer = document.getElementById('google-pay-button-container');
  
  // Create Stripe Elements
  const elements = stripe.elements();
  const cardElement = elements.create('card');
  cardElement.mount('#card-element');
  
  // Setup PayPal buttons
  setupPayPalButtons(paypalButtonContainer);
  
  // Setup Apple Pay if available
  if (stripe.applePay && window.ApplePaySession && ApplePaySession.canMakePayments()) {
    setupApplePay(stripe, applePayButtonContainer);
  } else {
    applePayButtonContainer.style.display = 'none';
  }
  
  // Setup Google Pay if available
  if (stripe.googlePay) {
    setupGooglePay(stripe, googlePayButtonContainer);
  } else {
    googlePayButtonContainer.style.display = 'none';
  }
  
  // Handle form submission for credit card payments
  paymentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await processCardPayment(stripe, cardElement);
  });
}

// Setup PayPal buttons
function setupPayPalButtons(container) {
  window.paypal.Buttons({
    style: {
      layout: 'vertical',
      color: 'blue',
      shape: 'rect',
      label: 'pay'
    },
    
    createOrder: async function(data, actions) {
      // Get plan details from the form
      const planDetails = getSelectedPlanDetails();
      
      // Create order on the server
      const response = await fetch(`${API_BASE_URL}/api/payments/create-paypal-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          planId: planDetails.id,
          amount: planDetails.price,
          currency: PAYMENT_CONFIG.paypal.currency
        })
      });
      
      const orderData = await response.json();
      return orderData.id;
    },
    
    onApprove: async function(data, actions) {
      // Show loading state
      showProcessingPayment();
      
      // Capture the funds from the transaction
      const response = await fetch(`${API_BASE_URL}/api/payments/capture-paypal-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId: data.orderID
        })
      });
      
      const captureData = await response.json();
      
      // Handle successful payment
      if (captureData.status === 'COMPLETED') {
        handleSuccessfulPayment(captureData);
      } else {
        handleFailedPayment(captureData);
      }
    },
    
    onError: function(err) {
      console.error('PayPal error:', err);
      handleFailedPayment({
        error: 'PayPal payment failed. Please try again or use a different payment method.'
      });
    }
  }).render(container);
}

// Setup Apple Pay
function setupApplePay(stripe, container) {
  const applePayButton = document.createElement('button');
  applePayButton.className = 'apple-pay-button';
  container.appendChild(applePayButton);
  
  applePayButton.addEventListener('click', async (event) => {
    event.preventDefault();
    
    // Get plan details
    const planDetails = getSelectedPlanDetails();
    
    // Create payment request
    const paymentRequest = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Sleep Haven Plan',
        amount: planDetails.price * 100 // Stripe uses cents
      },
      requestPayerName: true,
      requestPayerEmail: true
    });
    
    // Create Apple Pay session
    const session = await stripe.createPaymentMethod({
      type: 'card',
      card: {
        token: paymentRequest
      }
    });
    
    // Process payment
    await processStripePayment(stripe, session.paymentMethod.id, planDetails);
  });
}

// Setup Google Pay
function setupGooglePay(stripe, container) {
  const googlePayButton = document.createElement('button');
  googlePayButton.className = 'google-pay-button';
  container.appendChild(googlePayButton);
  
  googlePayButton.addEventListener('click', async (event) => {
    event.preventDefault();
    
    // Get plan details
    const planDetails = getSelectedPlanDetails();
    
    // Create payment request
    const paymentRequest = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Sleep Haven Plan',
        amount: planDetails.price * 100 // Stripe uses cents
      },
      requestPayerName: true,
      requestPayerEmail: true
    });
    
    // Create Google Pay session
    const session = await stripe.createPaymentMethod({
      type: 'card',
      card: {
        token: paymentRequest
      }
    });
    
    // Process payment
    await processStripePayment(stripe, session.paymentMethod.id, planDetails);
  });
}

// Process credit card payment
async function processCardPayment(stripe, cardElement) {
  // Show loading state
  showProcessingPayment();
  
  // Get customer details from form
  const customerDetails = {
    name: document.getElementById('cardholder-name').value,
    email: document.getElementById('email').value
  };
  
  // Get plan details
  const planDetails = getSelectedPlanDetails();
  
  try {
    // Create payment method
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: customerDetails.name,
        email: customerDetails.email
      }
    });
    
    if (result.error) {
      // Show error to customer
      handleFailedPayment({
        error: result.error.message
      });
      return;
    }
    
    // Process payment with the payment method ID
    await processStripePayment(stripe, result.paymentMethod.id, planDetails, customerDetails);
    
  } catch (error) {
    console.error('Error processing card payment:', error);
    handleFailedPayment({
      error: 'An unexpected error occurred. Please try again.'
    });
  }
}

// Process Stripe payment (used by credit card, Apple Pay, and Google Pay)
async function processStripePayment(stripe, paymentMethodId, planDetails, customerDetails = {}) {
  try {
    // Create payment intent on the server
    const response = await fetch(`${API_BASE_URL}/api/payments/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethodId,
        planId: planDetails.id,
        amount: planDetails.price,
        currency: 'usd',
        customerDetails: customerDetails
      })
    });
    
    const paymentData = await response.json();
    
    // Handle client-side confirmation if required
    if (paymentData.requiresAction) {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentData.clientSecret
      );
      
      if (error) {
        // Payment failed
        handleFailedPayment({
          error: error.message
        });
      } else if (paymentIntent.status === 'succeeded') {
        // Payment succeeded
        handleSuccessfulPayment(paymentIntent);
      }
    } else if (paymentData.status === 'succeeded') {
      // Payment succeeded
      handleSuccessfulPayment(paymentData);
    } else {
      // Payment failed
      handleFailedPayment(paymentData);
    }
  } catch (error) {
    console.error('Error processing Stripe payment:', error);
    handleFailedPayment({
      error: 'An unexpected error occurred. Please try again.'
    });
  }
}

// Get selected plan details from the form
function getSelectedPlanDetails() {
  // This would be populated based on the selected plan
  // For now, returning a default plan
  return {
    id: 'sleep-plan-standard',
    name: 'Sleep Haven Standard Plan',
    price: 99.99,
    description: 'Personalized sleep plan with 5-day support'
  };
}

// Show processing payment UI
function showProcessingPayment() {
  const paymentUI = document.getElementById('payment-ui');
  const processingUI = document.getElementById('processing-ui');
  
  paymentUI.style.display = 'none';
  processingUI.style.display = 'block';
}

// Handle successful payment
function handleSuccessfulPayment(paymentData) {
  // Hide processing UI
  const processingUI = document.getElementById('processing-ui');
  const successUI = document.getElementById('success-ui');
  
  processingUI.style.display = 'none';
  successUI.style.display = 'block';
  
  // Store transaction ID for receipt
  document.getElementById('transaction-id').textContent = paymentData.id;
  
  // Redirect to app after short delay
  setTimeout(() => {
    window.location.href = 'https://wazzittv.manus.space/?locale=en';
  }, 3000);
}

// Handle failed payment
function handleFailedPayment(paymentData) {
  // Hide processing UI
  const processingUI = document.getElementById('processing-ui');
  const failureUI = document.getElementById('failure-ui');
  const errorMessage = document.getElementById('error-message');
  
  processingUI.style.display = 'none';
  failureUI.style.display = 'block';
  
  // Display error message
  errorMessage.textContent = paymentData.error || 'Payment failed. Please try again.';
}

// Export functions for use in the main application
export {
  initializePayments,
  PAYMENT_CONFIG
};
