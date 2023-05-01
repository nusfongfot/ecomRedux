import { Box, Button, Typography } from "@mui/material";
import styles from "./styles.module.scss";

function Checkout({
  subtotal,
  shippingFee,
  total,
  selected,
  saveCartToDb,
}) {
  return (
    <Box className={`${styles.cart_checkout} ${styles.card}`}>
      <Typography variant="h5">Order Summary</Typography>
      <Box className={styles.cart_checkout_line}>
        <span>Subtotal</span>
        <span>{subtotal} $</span>
      </Box>
      <Box className={styles.cart_checkout_line}>
        <span>Shipping</span>
        <span>+{shippingFee} $</span>
      </Box>
      <Box className={styles.cart_checkout_total}>
        <span>Total</span>
        <span>{total} $</span>
      </Box>

      <Box className={styles.submit}>
        <Button
          variant="contained"
          fullWidth
          disabled={selected.length == 0}
          onClick={() => saveCartToDb()}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
export default Checkout;
