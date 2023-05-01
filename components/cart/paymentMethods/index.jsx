import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";

function PaymentMethods() {
  return (
    <Box className={`${styles.card} ${styles.cart_method}`}>
      <Typography className={styles.header} variant="h5">
        Payment Methods
      </Typography>
      <Box className={styles.images}>
        <img src="../../../images/payment/visa.webp" alt="" />
        <img src="../../../images/payment/mastercard.webp" alt="" />
        <img src="../../../images/payment/paypal.webp" alt="" />
      </Box>
      <Typography className={styles.header} variant="h5">
        Buyer Protection
      </Typography>
      <Box className={styles.protection}>
        <img src="../../../images/protection.png" alt="" />
        Get full refund if the item is not as described or if it's not
        delievred.
      </Box>
    </Box>
  );
}
export default PaymentMethods;
