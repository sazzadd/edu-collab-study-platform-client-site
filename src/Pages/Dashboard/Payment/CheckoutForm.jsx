import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe or Elements is not ready.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      console.error("CardElement is not available.");
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.error("Payment error:", error);
    } else {
      console.log("Payment method created successfully:", paymentMethod);
    }
  };
  return (
    <div>
      <h1 className="text-2xl text-center font-bold py-12">Payment</h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6"
        >
          <div className="mb-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#333",
                    "::placeholder": {
                      color: "#888",
                    },
                  },
                  invalid: {
                    color: "#e63946",
                  },
                },
              }}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={!stripe}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
