# Sleep Haven Production Deployment Guide

This guide provides step-by-step instructions for deploying the Sleep Haven application to production with the domain sleephaven.ai and live payment processing.

## Table of Contents
1. [Domain Registration](#domain-registration)
2. [Hosting Setup](#hosting-setup)
3. [DNS Configuration](#dns-configuration)
4. [Payment Provider Setup](#payment-provider-setup)
5. [Environment Configuration](#environment-configuration)
6. [Deployment Process](#deployment-process)
7. [Verification Steps](#verification-steps)
8. [Maintenance](#maintenance)

## Domain Registration

1. **Register sleephaven.ai with Namecheap**:
   - Go to [Namecheap](https://www.namecheap.com)
   - Search for "sleephaven.ai"
   - Complete the purchase (approximately $70-90/year)
   - Choose auto-renewal to prevent domain expiration

2. **Access Namecheap Dashboard**:
   - Log in to your Namecheap account
   - Go to "Domain List"
   - Click "Manage" next to sleephaven.ai
   - Navigate to "Advanced DNS" for the next steps

## Hosting Setup

### Frontend Hosting (Vercel)

1. **Create Vercel Account**:
   - Go to [Vercel](https://vercel.com)
   - Sign up or log in
   - Connect your GitHub account

2. **Import Sleep Haven Frontend Repository**:
   - Click "Import Project"
   - Select your Sleep Haven frontend repository
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Configure Environment Variables**:
   - Go to "Settings" > "Environment Variables"
   - Add the following variables:
     - `VITE_API_URL`: https://api.sleephaven.ai
     - `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
     - `VITE_PAYPAL_CLIENT_ID`: Your PayPal client ID

4. **Set Up Custom Domain**:
   - Go to "Settings" > "Domains"
   - Add your domains:
     - sleephaven.ai
     - www.sleephaven.ai
   - Follow Vercel's instructions to configure DNS records

### Backend Hosting (Heroku)

1. **Create Heroku Account**:
   - Go to [Heroku](https://www.heroku.com)
   - Sign up or log in

2. **Create New App**:
   - Click "New" > "Create new app"
   - Name: "sleep-haven-api"
   - Choose a region close to your target audience

3. **Connect GitHub Repository**:
   - Go to "Deploy" tab
   - Choose "GitHub" as deployment method
   - Connect to your Sleep Haven backend repository
   - Enable automatic deploys from main branch

4. **Configure Environment Variables**:
   - Go to "Settings" > "Config Vars"
   - Add all variables from the `.env.production` file
   - Ensure all sensitive keys are properly set

5. **Set Up Custom Domain**:
   - Go to "Settings" > "Domains"
   - Click "Add domain"
   - Enter: api.sleephaven.ai
   - Note the DNS target provided by Heroku

### Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up or log in

2. **Create New Cluster**:
   - Choose M10 tier (production-ready)
   - Select a region close to your Heroku app
   - Configure additional settings as needed

3. **Set Up Database Access**:
   - Create a database user with strong password
   - Restrict access to specific IP addresses or allow from anywhere

4. **Get Connection String**:
   - Go to "Clusters" > "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<cluster>` with your values

## DNS Configuration

In your Namecheap Advanced DNS settings, add the following records:

1. **Frontend (Vercel)**:
   - Type: A Record
   - Host: @
   - Value: (Vercel's IP address)
   - TTL: Automatic
   
   - Type: CNAME
   - Host: www
   - Value: (Vercel's domain value)
   - TTL: Automatic

2. **Backend (Heroku)**:
   - Type: CNAME
   - Host: api
   - Value: (Heroku's domain value)
   - TTL: Automatic

## Payment Provider Setup

### PayPal Business Account

1. **Create PayPal Business Account**:
   - Go to [PayPal Business](https://www.paypal.com/business)
   - Click "Sign Up"
   - Complete the registration process
   - Verify your business identity

2. **Generate API Credentials**:
   - Log in to PayPal Developer Dashboard
   - Go to "My Apps & Credentials"
   - Create a new REST API app
   - Switch to "Live" mode
   - Note your Client ID and Secret

### Stripe Account

1. **Create Stripe Account**:
   - Go to [Stripe](https://stripe.com)
   - Click "Start now"
   - Complete the registration process
   - Verify your business identity

2. **Configure Stripe Settings**:
   - Enable Apple Pay and Google Pay in Dashboard
   - Set up webhook endpoints (https://api.sleephaven.ai/api/payments/stripe-webhook)
   - Get webhook signing secret
   - Note your Publishable Key and Secret Key

### SendGrid Account

1. **Create SendGrid Account**:
   - Go to [SendGrid](https://sendgrid.com)
   - Sign up for an account
   - Complete the verification process

2. **Configure Sender Authentication**:
   - Verify your domain (sleephaven.ai)
   - Set up a sender identity (receipts@sleephaven.ai)

3. **Generate API Key**:
   - Go to "Settings" > "API Keys"
   - Create a new API key with "Mail Send" permissions
   - Note your API key

## Environment Configuration

Update all environment variables in both Vercel and Heroku with the values from your payment providers:

1. **PayPal Variables**:
   - `PAYPAL_CLIENT_ID`: Your PayPal live client ID
   - `PAYPAL_CLIENT_SECRET`: Your PayPal live client secret

2. **Stripe Variables**:
   - `STRIPE_PUBLISHABLE_KEY`: Your Stripe live publishable key
   - `STRIPE_SECRET_KEY`: Your Stripe live secret key
   - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook signing secret

3. **SendGrid Variables**:
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `SENDGRID_FROM_EMAIL`: receipts@sleephaven.ai
   - `SENDGRID_FROM_NAME`: Sleep Haven

## Deployment Process

### Frontend Deployment

1. **Update API Endpoints**:
   - Ensure all API calls use https://api.sleephaven.ai
   - Update payment integration with live credentials

2. **Build and Deploy**:
   - Commit and push changes to your repository
   - Vercel will automatically build and deploy
   - Verify deployment status in Vercel dashboard

### Backend Deployment

1. **Update Environment Variables**:
   - Ensure all environment variables are set in Heroku
   - Verify MongoDB connection string is correct

2. **Deploy to Heroku**:
   - Commit and push changes to your repository
   - Heroku will automatically build and deploy
   - Verify deployment status in Heroku dashboard

## Verification Steps

After deployment, perform these verification steps:

1. **Website Accessibility**:
   - Visit https://sleephaven.ai
   - Ensure all pages load correctly
   - Test responsive design on mobile devices

2. **API Connectivity**:
   - Test API endpoints using Postman or similar tool
   - Verify CORS is properly configured
   - Check authentication flows

3. **Payment Processing**:
   - Complete a test purchase with each payment method
   - Verify payment records in database
   - Check receipt email delivery

4. **User Flows**:
   - Register a new account
   - Create a sleep plan
   - Test Margaret AI chat
   - Access user dashboard

## Maintenance

Regular maintenance tasks to keep your production environment healthy:

1. **Monitoring**:
   - Set up uptime monitoring for frontend and backend
   - Configure error tracking (Sentry recommended)
   - Monitor database performance

2. **Backups**:
   - Configure automated MongoDB backups
   - Regularly export user and payment data

3. **Updates**:
   - Keep dependencies updated
   - Apply security patches promptly
   - Test updates in staging before deploying to production

4. **Scaling**:
   - Monitor resource usage
   - Scale Heroku dynos as needed
   - Upgrade MongoDB tier if database grows significantly

---

For any questions or assistance with the deployment process, please contact our support team.
