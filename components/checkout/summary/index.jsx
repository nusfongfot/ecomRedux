import { useState } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import ShippingInput from "@/components/inputs/shippingInput";
import { applyCoupon } from "@/API/user";
import axios from "axios";
import { useRouter } from "next/router";

export default function Summary({
  totalAfterDiscount,
  setTotalAfterDiscount,
  user,
  cart,
  paymentMethod,
  selectedAddress,
}) {
  const router = useRouter();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const [order_error, setOrderError] = useState("");
  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Please enter a coupon first !"),
  });

  const applyCouponHandler = async () => {
    const res = await applyCoupon(coupon);
    console.log("resssss", res);
    if (res.msg) {
      setError(res.msg);
    } else {
      setTotalAfterDiscount(res.totalAfterDiscount);
      setDiscount(res.discount);
      setError("");
    }
  };

  const placeOrderHandler = async () => {
    try {
      if (paymentMethod == "") {
        setOrderError("Plase select a payment method");
        return;
      }
      if (selectedAddress == "") {
        setOrderError("Plase select a address method");

        return;
      }
      const { data } = await axios.post("/api/order/create", {
        products: cart.products,
        shippingAddress: selectedAddress,
        paymentMethod,
        total: totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal,
      });
      console.log("data", data);
      router.replace(`/order/${data.order_id}`);
    } catch (error) {
      // console.log(error)
      setOrderError(error.response.data.message);
    }
  };

  console.log(paymentMethod);
  return (
    <Box className={styles.summary}>
      <Typography>Summary</Typography>
      <Box className={styles.coupon}>
        <Formik
          enableReinitialize
          initialValues={{ coupon }}
          validationSchema={validateCoupon}
          onSubmit={() => applyCouponHandler()}
        >
          {(formik) => (
            <Form>
              <ShippingInput
                name="coupon"
                placeholder={"Coupon"}
                onChange={(e) => setCoupon(e.target.value)}
              />
              {error && <span style={{ color: "red" }}>{error}</span>}

              <Button type="submit" variant="contained">
                Apply
              </Button>
              <div className={styles.infos}>
                <span>
                  Total : <b>{cart.cartTotal}</b>
                </span>
                {discount > 0 && (
                  <span
                    className={styles.discount}
                    style={{ background: "green" }}
                  >
                    Coupon applied : <b>-{discount}%</b>
                  </span>
                )}
                {totalAfterDiscount < cart.cartTotal &&
                  totalAfterDiscount != "" && (
                    <span>
                      New Price : <b>{totalAfterDiscount}$</b>
                    </span>
                  )}
              </div>
            </Form>
          )}
        </Formik>
      </Box>
      {order_error && <span style={{ color: "red" }}>{order_error}</span>}
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ marginTop: 3, background: "blue", color: "white" }}
        onClick={placeOrderHandler}
      >
        Place Order
      </Button>
    </Box>
  );
}
