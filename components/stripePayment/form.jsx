import { useState } from "react";
import styles from "./styles.module.scss";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Box } from "@mui/material";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "blue",
      color: "#000",
      fontSize: "16px",
      fontSmoothing: "antialiased",
    },
  },
};

export default function Form({ order_id, total }) {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    try {
      const { id } = paymentMethod;
      const res = await axios.post(`/api/order/${order_id}/payWithStripe`, {
        amount: total,
        id,
      });
      if (res.data.success) {
        e.preventDefault();
      } else {
        setError(error);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Box className={styles.stripe}>
      <form onSubmit={handleSubmit} className={styles.stripe_form}>
        <CardElement options={CARD_OPTIONS} />
        <button type="submit">Pay</button>
        {error && <span style={{ color: "red" }}>{error}</span>}
      </form>
    </Box>
  );
}
