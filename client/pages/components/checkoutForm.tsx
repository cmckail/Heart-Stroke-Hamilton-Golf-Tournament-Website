  /* 
     A checkout form, required by stripe.
  */

import React, { useState, useEffect, FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import axios from "../../utils/axios";
import { Button } from "@material-ui/core";

export default function CheckoutForm(props: any) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const { name, email, amount } = props;

  const stripe = useStripe();
  const elements = useElements();

  const donator = props.donator;
  const testDonation = {
    name: "Anthony",
    email: "test@test.com",
    amount: 50.0,
  };

  // Create/retrieve PaymentIntent as soon as the page loads and amount is known
  useEffect(() => {
    let mounted = true;
    axios
      .post("/payment", {
        amount,
      })
      .then((res) => {
        if (mounted && res.data) setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.error(err));

    return function cleanup() {
      mounted = false;
    };
  }, []);

  const cardStyle = {
    // iconStyle: "solid",
    // hidePostalCode: true,
    style: {
      base: {
        iconColor: "rgb(240, 57, 122)",
        color: "rgb(240, 57, 122)",
        fontSize: "16px",
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#CFD7DF",
        },
      },
      invalid: {
        color: "#e5424d",
        ":focus": {
          color: "#303238",
        },
      },
    },
  };

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const res = await axios.post("/payment/customer", { name, email });

    if (res) setClientSecret(res.data.clientSecret);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      await axios.put("/payment/success");
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />

      <Button
        disabled={processing || disabled || succeeded}
        id="submit"
        type="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </Button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      {succeeded && (
        <p className="result-message">
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            {" "}
            Stripe dashboard.
          </a>{" "}
          Refresh the page to pay again.
        </p>
      )}
    </form>
  );
}
