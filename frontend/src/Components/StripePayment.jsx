import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log('Stripe key loaded:', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ? 'Yes' : 'No');

const CheckoutForm = ({ orderData, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  console.log('Stripe loaded:', stripe ? 'Yes' : 'No');
  console.log('Elements loaded:', elements ? 'Yes' : 'No');
  console.log('CardElement:', elements ? elements.getElement(CardElement) : 'Not available');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

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

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
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
      onPaymentError(error.message);
      toast.error(`Payment error: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: '#94a3b8',
        },
        backgroundColor: '#1e293b', // slate-800 to match parent
        border: '1px solid #10b981', // emerald-500
        borderRadius: '0.5rem',
        padding: '0.5rem',
      },
      invalid: {
        color: '#ef4444',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-800 p-4 rounded-lg border border-emerald-500">
        <label className="block text-emerald-400 text-lg font-semibold mb-3">
          Card Details
        </label>
        <CardElement options={cardElementOptions} />
      </div>
      
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-3 rounded-xl font-semibold transition ${
          processing || !stripe
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

export default StripePayment;