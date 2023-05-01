import { Box, Button, Rating, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { TbMinus, TbPlus } from "react-icons/tb";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import ShareToSocial from "./share";
import Accordian from "../accordian";
import SimilarSwiper from "./similarSwiper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "@/store/cartSlice";
import { useCartStore } from "@/zustand/cartStore";

function Infos({ product, setActiveImg }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { cartItems, addToCartStore, updateCartStore } = useCartStore();

  const [size, setSize] = useState(router.query.size);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  const { cart } = useSelector((state) => ({ ...state }));

  const addToCartHandler = async () => {
    if (!router.query.size) {
      setError("Please Select a size");
      return;
    }

    const { data } = await axios.get(
      `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
    );

    if (qty > data.quantity) {
      setError(
        "The Quantity you have choosed is more than in stock. Try and lower the quantity"
      );
    } else if (data.quantity < 1) {
      setError("The Product is out of stock");
    } else {
      let _uid = `${data._id}_${product.style}_${router.query.size}`;
      let exist = cartItems.find((p) => p._uid === _uid);
      if (exist) {
        //update
        let newCart = cartItems.map((p) => {
          if (p._uid == exist._uid) {
            return { ...p, qty };
          }
          return p;
        });
        // dispatch(updateCart(newCart));
        updateCartStore(newCart);
      } else {
        // dispatch(addToCart({ ...data, qty, size: data.size, _uid }));
        addToCartStore({ ...data, qty, size: data.size, _uid });
      }
    }
  };

  const checkQuantity = () => {
    if (qty > product.quantity) {
      setQty(product.quantity);
    }
  };

  useEffect(() => {
    setSize("");
    setQty(1);
  }, [router.query.style]);

  useEffect(() => {
    checkQuantity();
  }, [router.query.size]);

  return (
    <Box className={styles.infos}>
      <Box className={styles.infos_container}>
        <Typography variant="h5" className={styles.infos_name}>
          {product.name}
        </Typography>
        <Typography variant="h6" className={styles.infos_sku}>
          {product.sku}
        </Typography>
        <Box className={styles.infos_rating}>
          <Rating
            name="half-rating-read"
            defaultValue={product.rating}
            precision={0.5}
            readOnly
            style={{ color: "#FACF19" }}
          />
          {product.numReviews} {product.numReviews === 1 ? "review" : "reviews"}
        </Box>
        <Box className={styles.infos_price}>
          {!size ? (
            <Typography variant="h6">{product.priceRange}</Typography>
          ) : (
            <Typography variant="h6">{product.price}</Typography>
          )}
          {product.discount > 0 ? (
            <Typography variant="h5">
              {size && (
                <Typography variant="caption" className={styles.line}>
                  {product.priceBefore}
                </Typography>
              )}
              (-{product.discount}%)
            </Typography>
          ) : null}
        </Box>{" "}
        <Box component={"span"}>
          {size
            ? product.quantity
            : product.sizes.reduce((start, next) => start + next.qty, 0)}{" "}
          pieces available.
        </Box>
        <Box className={styles.infos_sizes}>
          <Typography>Select a Size :</Typography>
          <Box className={styles.infos_sizes_wrap}>
            {product.sizes.map((size, i) => (
              <Link
                key={i}
                href={`/product/${product._id}?style=${router.query.style}&size=${i}`}
              >
                <Box
                  className={`${styles.infos_sizes_size} ${
                    i == router.query.size && styles.active_size
                  }`}
                  onClick={() => setSize(size.size)}
                >
                  {size.size}
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
        <Box className={styles.infos_colors}>
          {product.colors &&
            product.colors.map((color, i) => (
              <Box
                key={i}
                component={"span"}
                className={i == router.query.style ? styles.active_color : null}
                onMouseOver={() =>
                  setActiveImg(product.subProducts[i].images[0].url)
                }
                onMouseLeave={() => setActiveImg("")}
              >
                <Link href={`/product/${product._id}?style=${i}`}>
                  <img src={color.image} />
                </Link>
              </Box>
            ))}
        </Box>
        <Box className={styles.infos_qty}>
          <Button
            onClick={() => (qty > 1 ? setQty((prev) => prev - 1) : null)}
            sx={{ border: "1px solid white", color: "white" }}
          >
            <TbMinus />
          </Button>
          <Box component={"span"}>{qty}</Box>
          <Button
            onClick={() =>
              qty < product.quantity ? setQty((prev) => prev + 1) : null
            }
            sx={{ border: "1px solid white", color: "white" }}
          >
            <TbPlus />
          </Button>
        </Box>
        <Box className={styles.infos_actions}>
          <Button
            disabled={product.quantity < 1}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              border: "1px solid white",
              color: "white",
              ":hover": {
                background: "black",
              },
            }}
            fullWidth
            onClick={() => addToCartHandler()}
          >
            <BsHandbagFill />
            <Box component={"b"}>Add To Cart</Box>
          </Button>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              border: "1px solid white",
              color: "white",
              ":hover": {
                background: "black",
              },
            }}
            fullWidth
          >
            <BsHeart />
            <Box component={"b"}>Wishlist</Box>
          </Button>
        </Box>
        {error && (
          <Box component={"span"} className={styles.error}>
            {error}
          </Box>
        )}
        <ShareToSocial />
        <Accordian details={[product.description, ...product.details]} />
        <SimilarSwiper />
      </Box>
    </Box>
  );
}
export default Infos;
