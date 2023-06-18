import Header from "@/components/cart/header/index";

import { Box } from "@mui/material";
import styles from "@/styles/cart.module.scss";
import EmptyCart from "@/components/cart/empty";
import { useCartStore } from "@/zustand/cartStore";
import Product from "@/components/cart/product";
import CartHeader from "@/components/cart/cartHeader";
import Checkout from "@/components/cart/checkout";
import { useEffect, useState } from "react";
import PaymentMethods from "@/components/cart/paymentMethods";
import ProductsSwiper from "@/components/productsSwiper";
import { women_swiper } from "@/data/home";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { saveCart } from "@/API/saveCart";
import axios from "axios";
import { useLoadingStore } from "@/zustand/loadingStore";
import DotLoading from "@/components/loader/dotloader/dotloader";

function Cart() {
  const { cartItems, updateCartStore } = useCartStore();
  const { isLoading, startLoading, stopLoading } = useLoadingStore();
  const { data: session } = useSession();
  const router = useRouter();

  const [selected, setSelected] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const saveCartToDb = async () => {
    startLoading(true);
    try {
      if (session?.user) {
        await saveCart(selected);
        router.replace("/checkout");
      } else {
        signIn();
      }
    } catch (error) {
      console.error("Error saving cart:", error);
    } finally {
      stopLoading(false);
    }
  };

  const updateDataCart = async () => {
    const { data } = await axios.post("/api/updateCart", {
      products: cartItems,
    });
    updateCartStore(data);
  };

  // useEffect(() => {
  //   const valueShipping = selected
  //     .reduce((a, c) => a + c.shipping, 0)
  //     .toFixed(2);
  //   console.log("valueShipping", valueShipping);
  //   const valueSubtotal = selected
  //     .reduce((a, c) => a + c.price * c.qty, 0)
  //     .toFixed(2);
  //   const valueTotal = selected
  //     .reduce((a, c) => a + c.price * c.qty, 0 + Number(shippingFee))
  //     .toFixed(2);
  //   setShippingFee(valueShipping);
  //   setSubTotal(valueSubtotal);
  //   setTotal(valueTotal);
  // }, [selected]);

  useEffect(() => {
    const valueShipping = selected
      .reduce(
        (a, c) => a + (typeof c.shipping === "number" ? c.shipping : 0),
        0
      )
      .toFixed(2);
    const valueSubtotal = selected
      .reduce(
        (a, c) => a + (typeof c.price === "number" ? c.price * c.qty : 0),
        0
      )
      .toFixed(2);
    const valueTotal = selected
      .reduce(
        (a, c) =>
          a +
          (typeof c.price === "number" ? c.price * c.qty : 0) +
          Number(shippingFee),
        0
      )
      .toFixed(2);

    setShippingFee(valueShipping);
    setSubTotal(valueSubtotal);
    setTotal(valueTotal);
  }, [selected]);

  useEffect(() => {
    localStorage.getItem("cart-store");

    if (cartItems.length > 0) {
      updateDataCart();
    }
  }, []);

  return (
    <>
      <Header />
      <Box className={styles.cart} mt={10}>
        {cartItems.length > 0 ? (
          <Box className={styles.cart_container}>
            <CartHeader
              cartInfos={cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <Box className={styles.cart_products}>
              {cartItems.map((product) => (
                <Product
                  key={product._uid}
                  product={product}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </Box>
            <Checkout
              subtotal={subTotal}
              shippingFee={shippingFee}
              total={total}
              selected={selected}
              saveCartToDb={saveCartToDb}
            />
            <PaymentMethods />
          </Box>
        ) : (
          <EmptyCart />
        )}

        {/* <ProductsSwiper products={women_swiper} /> */}
      </Box>
      {isLoading && <DotLoading />}
    </>
  );
}
export default Cart;
