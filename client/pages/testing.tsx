import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./components/checkoutForm";
import NavigationBar from './components/navigationBar'

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
export default function Testing() {
  return (
    <div>
               <NavigationBar/>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
