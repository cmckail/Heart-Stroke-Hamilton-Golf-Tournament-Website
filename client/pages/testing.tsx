import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/checkoutForm";

const promise = loadStripe(
  "pk_test_51IDatjDjZpVcmWL1lt5sCGGR7bhovYooY080IFcBGjpAWQanpltyXeP1HvH2Akec9wL4lXrQ60UUyFmsiPRT8h7t00IEffLQSQ"
);
export default function Testing() {
  return (
    <div>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
