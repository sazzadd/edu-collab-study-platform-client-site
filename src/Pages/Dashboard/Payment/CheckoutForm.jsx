import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const CheckoutForm = ({ session }) => {
  console.log(session.registrationFee);
  const amount = session.registrationFee;
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
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
      setError(error);
    } else {
      console.log("Payment method created successfully:", paymentMethod);
    }

  };
  useEffect(() => {
    const res = axiosSecure.post("/create-payment-intent", {price:amount}).then((res) => {
      // console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [amount]);
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
            disabled={!stripe ||!clientSecret}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          >
            Pay
          </button>
          <p className="text-red-400">{error}</p>
          {/* {transactionId && (
        <p className="text-green-500">Your transction id : {transactionId}</p>
      )} */}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
