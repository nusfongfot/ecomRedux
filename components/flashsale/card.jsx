import { Box } from "@mui/material";
import Link from "next/link";
import styles from "./flash.module.scss";
import { MdFlashOn } from "react-icons/md";

function FlashCard({ product }) {
  return (
    <Box>
      <Box className={styles.cardImg}>
        <Link href={product.link}>
          <img src={product.image} />
        </Link>
      </Box>
      <Box className={styles.flash}>
        <MdFlashOn />
        <span>- {product.discount}%</span>
      </Box>
      <Box className={styles.cardPrice}>
        <MdFlashOn />
        <span>
          USD{(product.price - product.price / product.discount).toFixed(2)}$
        </span>
        {/* <span>
          USD
          {(
            product.price -
            product.price -
            product.price / product.discount
          ).toFixed(2)}
          $
        </span> */}
      </Box>
    </Box>
  );
}
export default FlashCard;
