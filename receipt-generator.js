// Sleep Haven Receipt Generator Utility
// This file contains functions to generate HTML and PDF receipts

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

// Generate HTML receipt
function generateReceiptHTML(paymentDetails) {
  // Format date
  const formattedDate = moment(paymentDetails.timestamp).format('MMMM D, YYYY');
  
  // Format amount with 2 decimal places
  const formattedAmount = parseFloat(paymentDetails.amount).toFixed(2);
  
  // Generate HTML
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Sleep Haven Receipt</title>
      <style>
        body {
          font-family: 'Helvetica', 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .receipt {
          border: 1px solid #ddd;
          padding: 30px;
          border-radius: 5px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          max-width: 200px;
          margin-bottom: 20px;
        }
        h1 {
          color: #4a6da7;
          margin: 0;
          font-size: 24px;
        }
        .receipt-details {
          margin-bottom: 30px;
        }
        .receipt-details table {
          width: 100%;
          border-collapse: collapse;
        }
        .receipt-details th {
          text-align: left;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        .receipt-details td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        .total {
          font-weight: bold;
          font-size: 18px;
          text-align: right;
          margin-top: 20px;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 14px;
          color: #777;
        }
        .payment-info {
          margin-top: 30px;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <img src="https://sleephaven.ai/images/logo.png" alt="Sleep Haven Logo" class="logo">
          <h1>Payment Receipt</h1>
        </div>
        
        <div class="receipt-details">
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Transaction ID:</strong> ${paymentDetails.transactionId}</p>
          <p><strong>Payment Method:</strong> ${paymentDetails.paymentMethod === 'paypal' ? 'PayPal' : 'Credit Card'}</p>
          
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sleep Haven Personalized Sleep Plan</td>
                <td>${paymentDetails.currency} ${formattedAmount}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="total">
            Total: ${paymentDetails.currency} ${formattedAmount}
          </div>
        </div>
        
        <div class="payment-info">
          <p><strong>Billed to:</strong> ${paymentDetails.payerName}</p>
          <p><strong>Email:</strong> ${paymentDetails.payerEmail}</p>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing Sleep Haven!</p>
          <p>If you have any questions about this receipt, please contact our support team at support@sleephaven.ai</p>
          <p>Sleep Haven, Inc. • www.sleephaven.ai</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Generate PDF receipt
async function generateReceiptPDF(paymentDetails) {
  return new Promise((resolve, reject) => {
    try {
      // Create a new PDF document
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50
      });
      
      // Format date
      const formattedDate = moment(paymentDetails.timestamp).format('MMMM D, YYYY');
      
      // Format amount with 2 decimal places
      const formattedAmount = parseFloat(paymentDetails.amount).toFixed(2);
      
      // Buffer to store PDF
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      
      // Resolve promise with PDF data when done
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      
      // Add content to PDF
      
      // Header
      doc.fontSize(20)
         .fillColor('#4a6da7')
         .text('Sleep Haven', { align: 'center' })
         .fontSize(16)
         .text('Payment Receipt', { align: 'center' })
         .moveDown(2);
      
      // Receipt details
      doc.fontSize(12)
         .fillColor('#333')
         .text(`Date: ${formattedDate}`)
         .text(`Transaction ID: ${paymentDetails.transactionId}`)
         .text(`Payment Method: ${paymentDetails.paymentMethod === 'paypal' ? 'PayPal' : 'Credit Card'}`)
         .moveDown(1);
      
      // Table header
      const tableTop = doc.y;
      const tableLeft = 50;
      const tableRight = 550;
      const rowHeight = 30;
      
      doc.moveTo(tableLeft, tableTop)
         .lineTo(tableRight, tableTop)
         .stroke();
      
      doc.fontSize(12)
         .text('Description', tableLeft + 10, tableTop + 10)
         .text('Amount', tableRight - 100, tableTop + 10);
      
      // Table row
      const rowTop = tableTop + rowHeight;
      doc.moveTo(tableLeft, rowTop)
         .lineTo(tableRight, rowTop)
         .stroke();
      
      doc.text('Sleep Haven Personalized Sleep Plan', tableLeft + 10, rowTop + 10)
         .text(`${paymentDetails.currency} ${formattedAmount}`, tableRight - 100, rowTop + 10);
      
      // Table bottom
      const tableBottom = rowTop + rowHeight;
      doc.moveTo(tableLeft, tableBottom)
         .lineTo(tableRight, tableBottom)
         .stroke();
      
      // Total
      doc.fontSize(14)
         .text(`Total: ${paymentDetails.currency} ${formattedAmount}`, tableRight - 200, tableBottom + 20, { align: 'right' })
         .moveDown(2);
      
      // Payment info
      doc.fontSize(12)
         .rect(tableLeft, doc.y, 500, 80)
         .fillAndStroke('#f9f9f9', '#ddd');
      
      doc.fillColor('#333')
         .text(`Billed to: ${paymentDetails.payerName}`, tableLeft + 20, doc.y - 60)
         .text(`Email: ${paymentDetails.payerEmail}`, tableLeft + 20, doc.y - 40)
         .moveDown(4);
      
      // Footer
      doc.fontSize(10)
         .fillColor('#777')
         .text('Thank you for choosing Sleep Haven!', { align: 'center' })
         .text('If you have any questions about this receipt, please contact our support team at support@sleephaven.ai', { align: 'center' })
         .text('Sleep Haven, Inc. • www.sleephaven.ai', { align: 'center' });
      
      // Finalize PDF
      doc.end();
      
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  generateReceiptHTML,
  generateReceiptPDF
};
