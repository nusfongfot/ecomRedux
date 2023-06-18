import { Box, Typography } from "@mui/material";
import styles from "./style.module.scss";

export default function Products({ cart }) {
  return (
    <Box className={styles.products}>
      <Box className={styles.products_header}>
        <Typography>Cart</Typography>
        <span>
          {cart.products.length == 1
            ? "1 item"
            : `${cart.products.length} items`}
        </span>
      </Box>
      <Box className={styles.products_wrap}>
        {cart.products.map((item, i) => (
          <Box className={styles.product} key={i}>
            <Box className={styles.product_img}>
              <img src={item.image} alt="" />
            </Box>
            <Box className={styles.product_infos}>
              <img src={item.color.image} alt="" />
              <span>{item.size}</span>
              <span>x {item.qty}</span>
            </Box>
            <Box className={styles.product_name}>
              {item.name.length > 18
                ? `${item.name.substring(0, 18)}...`
                : item.name}
            </Box>
            <Box className={styles.product_price}>
              {item.price * item.qty.toFixed(2)}$
            </Box>
          </Box>
        ))}

        <Box className={styles.products_total}>
          Subtotal : <b>{cart.cartTotal}$</b>
        </Box>
      </Box>
    </Box>
  );
}
