import Header from "@/components/cart/header/index";
import { Box } from "@mui/material";
import styles from "@/styles/cart.module.scss";
import EmptyCart from "@/components/cart/empty";

function Cart() {
  const cart = [];
  return (
    <>
      <Header />
      <Box className={styles.cart} mt={10}>
        {cart.length > 1 ? (
          <Box className={styles.cart_container}></Box>
        ) : (
          <EmptyCart />
        )}
      </Box>
    </>
  );
}
export default Cart;
