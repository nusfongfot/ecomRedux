import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { useState } from "react";
import { paymentMethods } from "@/data/paymentMethods";

export default function PaymentMethod({ paymentMethod, setPaymentMethod }) {
  return (
    <Box className={styles.payment}>
      <Typography className={styles.header}>Payment Method</Typography>
      {paymentMethods.map((pm, i) => (
        <label
          htmlFor={pm.id}
          key={i}
          className={styles.payment_item}
          onClick={() => setPaymentMethod(pm.id)}
          style={{ background: `${paymentMethod == pm.id} ? #f5f5f5 : "` }}
        >
          <input
            type="radio"
            name="payment"
            id={pm.id}
            checked={paymentMethod == pm.id}
          />
          <img src={`images/checkout/${pm.id}.webp`} alt={pm.name} />

          <Box className={styles.payment_item_col}>
            <p>Pay With {pm.name}</p>
            <span>
              {pm.images.length > 0
                ? pm.images.map((item) => (
                    <img src={`images/payment/${item}.webp`} alt={item} />
                  ))
                : pm.description}
            </span>
          </Box>
        </label>
      ))}
    </Box>
  );
}
