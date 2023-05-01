import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Button, Typography } from "@mui/material";
import { BsHeart } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useCartStore } from "@/zustand/cartStore";

function Product({ product, setSelected, selected }) {
  const { cartItems, updateCartStore } = useCartStore();
  const [active, setActive] = useState("");

  const updateQty = (type) => {
    let newCart = cartItems.map((p) => {
      if (p._uid == product._uid) {
        return {
          ...p,
          qty: type == "plus" ? product.qty + 1 : product.qty - 1,
        };
      }
      return p;
    });
    updateCartStore(newCart);
  };

  const removeProduct = (id) => {
    let newCart = cartItems.filter((item) => item._uid !== id);
    updateCartStore(newCart);
  };

  const handleSelected = () => {
    if (active) {
      const filter = selected.filter((p) => p._uid != product._uid);
      setSelected(filter);
    } else {
      setSelected([...selected, product]);
    }
  };

  useEffect(() => {
    const check = selected.find((p) => p._uid == product._uid);
    setActive(check);
  }, [selected]);

  return (
    <Box className={`${styles.card} ${styles.product}`}>
      {product.quantity < 1 && <Box className={styles.blur}></Box>}
      <Box className={styles.product_header}>
        <img src="images/store.webp" alt="img" />
        <Typography sx={{ color: "white", fontWeight: 300 }}>
          {" "}
          Scorpion Official Store
        </Typography>
      </Box>
      <Box className={styles.product_image}>
        <Box
          className={`${styles.checkbox} ${active ? styles.active : ""}`}
          onClick={() => handleSelected()}
        />
        <img src={product.images[0].url} />
        <Box className={styles.col}>
          <Box className={styles.grid}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {product.name.length > 30
                ? `${product.name.substring(0, 30)}`
                : product.name}
            </Typography>
            <Box sx={{ zIndex: "2" }}>
              <BsHeart />
            </Box>
            <Box sx={{ zIndex: "2" }}>
              <AiOutlineDelete onClick={() => removeProduct(product._uid)} />
            </Box>
          </Box>
          <Box className={styles.product_style}>
            <img src={product.color.image} alt="img" />
            {product.size && <span>{product.size}</span>}
            {product.price && <span>{product.price.toFixed(2)} $</span>}
            <MdOutlineKeyboardArrowRight />
          </Box>
          <Box className={styles.product_priceQty}>
            <Box className={styles.prodtuct_priceQty_price}>
              <span className={styles.price}>
                USD {(product.price * product.qty).toFixed(2)}${" "}
              </span>
              {product.price !== product.priceBefore && (
                <span className={styles.priceBefore}>
                  USD {product.priceBefore} $
                </span>
              )}
              {product.discount > 0 && (
                <span className={styles.discount}>- {product.discount} %</span>
              )}
              <Box className={styles.product_shipping} sx={{ marginTop: 1 }}>
                {product.shipping
                  ? `+${product.shipping}$ Shipping Fee`
                  : "Free Shipping"}
              </Box>
            </Box>

            <Box className={styles.product_priceQty_qty}>
              <Button
                disabled={product.qty < 2}
                variant="contained"
                onClick={() => updateQty("minus")}
              >
                -
              </Button>
              <span>{product.qty}</span>
              <Button
                disabled={product.qty == product.quantity}
                variant="contained"
                onClick={() => updateQty("plus")}
              >
                +
              </Button>
            </Box>

            {product.quantity < 1 && (
              <Box className={styles.notAvailable}>
                This Product is out of stock, Add it to your whishlist it may
                get restocked.
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Product;
