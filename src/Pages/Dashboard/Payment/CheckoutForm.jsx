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
  };
  return (
    <div>
      <h1 className="text-2xl text-center font-bold py-12">Payment</h1>
      <div >
        <form  style={{ maxWidth: "400px", margin: "auto" }} onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe }
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#6772E5",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
