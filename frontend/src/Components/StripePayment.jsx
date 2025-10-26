import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  useStripe
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import Input from '../design-system/components/Input';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_...');

const CheckoutForm = ({ orderData, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe) {
      console.log('Stripe not loaded');
      return;
    }

    setProcessing(true);

    console.log('Starting payment process for amount:', orderData.pricing.total);

    try {
      // Create payment intent
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: orderData.pricing.total,
          items: orderData.items,
          customerInfo: orderData.customerInfo
        })
      });

      const { clientSecret } = await response.json();

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      // Confirm payment with manual card details
      const [expMonth, expYear] = expiry.split('/').map(Number);
      console.log('Confirming payment with card details:', { cardNumber, expMonth, expYear, cvc });
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            number: cardNumber,
            exp_month: expMonth,
            exp_year: expYear,
            cvc: cvc,
          },
          billing_details: {
            name: orderData.customerInfo.name,
            email: orderData.customerInfo.email,
            phone: orderData.customerInfo.phone,
            address: {
              line1: orderData.customerInfo.address,
            },
          },
        },
      });

      if (error) {
        console.error('Payment failed:', error);
        onPaymentError(error.message);
        toast.error(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', paymentIntent);
        onPaymentSuccess(paymentIntent);
        toast.success('Payment successful!');
      }

    } catch (error) {
      console.error('Payment error:', error);
      console.log('Error details:', error.message);
      onPaymentError(error.message);
      toast.error(`Payment error: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-800 p-4 rounded-lg border border-emerald-500">
        <label className="block text-emerald-400 text-lg font-semibold mb-3">
          Card Details
        </label>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing || !cardNumber || !expiry || !cvc}
        className={`w-full py-3 rounded-xl font-semibold transition ${
          processing || !stripe || !cardNumber || !expiry || !cvc
            ? 'bg-gray-500 cursor-not-allowed text-gray-300'
            : 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white'
        }`}
      >
        {processing ? 'Processing Payment...' : `Pay ₹${orderData.pricing.total.toFixed(2)}`}
      </button>
    </form>
  );
};

const StripePayment = ({ orderData, onPaymentSuccess, onPaymentError }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        orderData={orderData} 
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
      />
    </Elements>
  );
};