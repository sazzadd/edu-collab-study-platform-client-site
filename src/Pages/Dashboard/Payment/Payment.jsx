import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const location = useLocation();
  const session = location.state?.session; 
  // console.log(session)
  const stripePromise = loadStripe(import.meta.env.VITE_Payemnt_Gateway_Pk);
  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm session={session}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
