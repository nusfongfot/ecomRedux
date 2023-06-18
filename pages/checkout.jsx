import PaymentMethod from "@/components/checkout/payment";
import Shipping from "@/components/checkout/shipping";
import Header from "@/components/header/header";
import Products from "@/components/checkout/products";
import CartModel from "@/models/Cart";
import UserModel from "@/models/User";
import styles from "@/styles/checkout.module.scss";
import { connectDb, disconnectDb } from "@/utils/db";
import { Box } from "@mui/material";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Summary from "@/components/checkout/summary";

function checkout({ cart, user }) {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [selectedAddress, setSelectedAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    let check = addresses.find((item) => item.active == true);
    if (check) {
      setSelectedAddress(check);
    } else {
      setSelectedAddress({});
    }
  }, [addresses]);
  return (
    <>
      <Header />
      <Box className={`${styles.container} ${styles.checkout}`}>
        <Box className={styles.checkout_side}>
          <Shipping
            user={user}
            addresses={addresses}
            setAddresses={setAddresses}
          />
          <Box p={2}>
            <Products cart={cart} />
          </Box>
        </Box>
        <Box p={2} className={styles.checkout_side}>
          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <Summary
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
            user={user}
            cart={cart}
            paymentMethod={paymentMethod}
            selectedAddress={selectedAddress}
          />
        </Box>
      </Box>
    </>
  );
}
export default checkout;

export async function getServerSideProps(context) {
  connectDb();
  const session = await getSession(context);
  const user = await UserModel.findById(session?.user.id);
  const cart = await CartModel.findOne({ user: user._id });
  disconnectDb();
  if (!cart) {
    return {
      redirect: {
        destination: "/cart",
      },
    };
  }
  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
