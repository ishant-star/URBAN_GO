import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_YOUR_KEY_HERE"
);

const CheckoutForm = ({ orderData, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe not initialized properly.");
      return;
    }

    setProcessing(true);

    try {
      // Create payment intent on backend
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payment/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: orderData.pricing.total,
            items: orderData.items,
            customerInfo: orderData.customerInfo,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to create payment intent");

      const { clientSecret } = await response.json();

      // Confirm payment using Stripe Elements (CardElement)
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: orderData.customerInfo.name,
              email: orderData.customerInfo.email,
              phone: orderData.customerInfo.phone,
              address: {
                line1: orderData.customerInfo.address,
              },
            },
          },
        }
      );

      if (error) {
        console.error("Payment failed:", error);
        toast.error(`Payment failed: ${error.message}`);
        onPaymentError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", paymentIntent);
        toast.success("Payment successful!");
        onPaymentSuccess(paymentIntent);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(`Payment error: ${error.message}`);
      onPaymentError(error.message);
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
        <div className="p-3 bg-white rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": { color: "#a0aec0" },
                },
                invalid: { color: "#fa755a" },
              },
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-3 rounded-xl font-semibold transition-colors ${
          processing
            ? "bg-gray-500 cursor-not-allowed text-gray-300"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {processing
          ? "Processing Payment..."
          : `Pay ₹${orderData.pricing.total.toFixed(2)}`}
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
