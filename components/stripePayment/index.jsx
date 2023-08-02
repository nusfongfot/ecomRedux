import { loadStripe } from "@stripe/stripe-js";
import styles from "./styles.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import Form from "./form";

export default function StripePayMent({ stripe_client_id, order_id, total }) {
  const stripePromise = loadStripe(stripe_client_id);
  return (
    <Elements stripe={stripePromise}>
      <Form total={total} order_id={order_id} />
    </Elements>
  );
}
