import Header from "@/components/header/header";
import StripePayMent from "@/components/stripePayment";
import OrderModel from "@/models/Order";
import styles from "@/styles/order.module.scss";
import { Box, Container, Typography } from "@mui/material";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect, useReducer } from "react";
import { IoIosArrowForward } from "react-icons/io";

function reducerPaypal(state, action) {
  switch (action.type) {
    case "PAY_REQUEST":
      return { ...state, loading: true };
    case "PAY_SUCCESS":
      return { ...state, loading: true, success: true };
    case "PAY_FAIL":
      return { ...state, loading: true, error: action.payload };
    case "PAY_RESET":
      return { ...state, loading: false, success: false, error: false };
    default:
      break;
  }
}

export default function OrderPage({
  order,
  paypal_client_id,
  stripe_client_id,
}) {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [{ loading, error, success }, dispatch] = useReducer(reducerPaypal, {
    loading: true,
    order: {},
    error: "",
  });

  function createOrderHanlder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.total,
            },
          },
        ],
      })
      .then((order_id) => {
        return order_id;
      });
  }
  function onApproveHandler(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/order/${order._id}/pay`,
          details
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "PAY_ERROR", payload: error });
      }
    });
  }
  function onErrorHandler(error) {
    console.log(error);
  }

  useEffect(() => {
    if (!order._id || success) {
      if (success) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      paypalDispatch({
        type: "resetOptions",
        value: {
          clientId: paypal_client_id,
          currency: "USD",
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    }
  }, [order, success]);
  return (
    <>
      <Header country={"country"} />
      <Container sx={{ mt: 2, mb: 2 }} className={styles.order}>
        <Box className={styles.container}>
          <Box className={styles.order_infos}>
            <Box className={styles.order_header}>
              <Box className={styles.order_header_head}>
                Home <IoIosArrowForward /> Orders <IoIosArrowForward />
                ID {order._id}
              </Box>
              <Box className={styles.order_header_status}>
                Payment Status :{" "}
                {order.isPaid ? (
                  <img src={"/images/verified.png"} alt="img" />
                ) : (
                  <img src={"/images/unverified.png"} alt="img" />
                )}
              </Box>
              <Box className={styles.order_header_status}>
                Order Status :{" "}
                <span
                  style={{
                    color:
                      order.status == "Not Processed"
                        ? "#e3530e"
                        : order.status == "Processing"
                        ? "#54b7d3"
                        : order.status == "Dispatched"
                        ? "#1e91cf"
                        : order.status == "Cancelled"
                        ? "#e3ddd4"
                        : order.status == "Completed"
                        ? "#4cb64c"
                        : "",
                  }}
                >
                  {order.status}
                </span>
              </Box>
            </Box>
            <Box className={styles.order_product}>
              {order.products.map((product, i) => (
                <Box className={styles.product} key={i}>
                  <Box className={styles.product_img}>
                    <img
                      style={{ width: 130, height: 130, objectFit: "cover" }}
                      src={product.image}
                      alt={product.name}
                    />
                  </Box>
                  <Box className={styles.product_infos}>
                    <Typography variant="h5">
                      {product.name.length > 30
                        ? `${product.name.substring(0, 30)}...`
                        : product.name}
                    </Typography>
                    <Box className={styles.product_infos_style}>
                      <img
                        className={styles.img_infos}
                        src={product.color.image}
                        alt=""
                      />
                      / {product.size}
                    </Box>
                    <Box className={styles.product_infos_priceQty}>
                      {product.price}$ x {product.qty}
                    </Box>
                    <Box className={styles.product_infos_total}>
                      $ {product.price * product.qty}
                    </Box>
                  </Box>
                </Box>
              ))}
              <Box className={styles.order_products_total}>
                {order.couponApplied == undefined ? (
                  <>
                    <Box className={styles.order_products_total_sub}>
                      <span>Tax price</span>
                      <span>+ {order.taxPrice}$</span>
                    </Box>
                    <Box
                      className={`${styles.order_products_total_sub} ${styles.bordertop}`}
                    >
                      <span>Total to pay</span>
                      <span> {order.total}$</span>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box className={styles.order_products_total_sub}>
                      <span>Subtotal</span>
                      <span>{order.totalBeforeDiscount}$</span>
                    </Box>
                    <Box className={styles.order_products_total_sub}>
                      <span>
                        Coupon Applied{" "}
                        <em style={{ color: "green" }}>
                          {order.couponApplied}
                        </em>
                      </span>
                      <span>
                        - {(order.totalBeforeDiscount - order.total).toFixed(2)}
                        $
                      </span>
                    </Box>
                    <Box className={styles.order_products_total_sub}>
                      <span>Tax price</span>
                      <span>+{order.taxPrice}$</span>
                    </Box>
                    <Box
                      className={`${styles.order_products_total_sub} ${styles.bordertop}`}
                    >
                      <span>Total to pay</span>
                      <b>{order.total}$</b>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
          <Box className={styles.order_actions}>
            <Box className={styles.order_address}>
              <Typography variant="h5">Customer's Order</Typography>
              <Box className={styles.order_address_user}>
                <Box mt={2} className={styles.order_address_user_infos}>
                  <img src={order.user.image} alt="" />
                </Box>
                <Box mt={2}>
                  <span>{order.user.name}</span>
                </Box>
                <Box>
                  <span>{order.user.email}</span>
                </Box>
              </Box>
            </Box>
            <Box className={styles.order_address_shipping}>
              <Typography variant="h5">Shipping Address</Typography>
              <span>
                {order.shippingAddress.firstName}{" "}
                {order.shippingAddress.lastName}
              </span>
              <span>{order.shippingAddress.address1}</span>
              <span>{order.shippingAddress.address2}</span>
              <span>
                {order.shippingAddress.state} , {order.shippingAddress.city}
              </span>
              <span> {order.shippingAddress.zipcode}</span>
              <span> {order.shippingAddress.country}</span>
            </Box>
            <Box className={styles.order_address_shipping}>
              <Typography variant="h5">Billing Address</Typography>
              <span>
                {order.shippingAddress.firstName}{" "}
                {order.shippingAddress.lastName}
              </span>
              <span>{order.shippingAddress.address1}</span>
              <span>{order.shippingAddress.address2}</span>
              <span>
                {order.shippingAddress.state} , {order.shippingAddress.city}
              </span>
              <span> {order.shippingAddress.zipcode}</span>
              <span> {order.shippingAddress.country}</span>
            </Box>

            {!order.isPaid && (
              <Box className={styles.order_payment}>
                {order.paymentMethod == "paypal" && (
                  <Box>
                    {isPending ? (
                      <span>Loading...</span>
                    ) : (
                      <PayPalButtons
                        createOrder={createOrderHanlder}
                        onApprove={onApproveHandler}
                        onError={onErrorHandler}
                      ></PayPalButtons>
                    )}
                  </Box>
                )}

                {order.paymentMethod == "credit_card" && (
                  <StripePayMent
                    total={order.total}
                    order_id={order._id}
                    stripe_client_id={stripe_client_id}
                  />
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const id = query.id;
  const order = await OrderModel.findById(id).populate("user").lean();
  let paypal_client_id = process.env.PAYPAL_CLIENT_ID;
  let stripe_client_id = process.env.STRIPE_CLIENT_ID;
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
      paypal_client_id,
      stripe_client_id,
    },
  };
}
