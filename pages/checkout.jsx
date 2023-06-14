import Shipping from "@/components/checkout/shipping";
import Header from "@/components/header/header";
import Cart from "@/models/Cart";
import User from "@/models/User";
import styles from "@/styles/checkout.module.scss";
import { connectDb, disconnectDb } from "@/utils/db";
import { Box } from "@mui/material";
import { getSession } from "next-auth/react";
import { useState } from "react";

function checkout({ cart, user }) {
  const [selectedAddress, setSelectedAddress] = useState("");
  return (
    <>
      <Header />
      <Box className={styles.checkout}>
        <Box className={styles.checkout_side}>
          <Shipping
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            user={user}
          />
        </Box>
        <Box className={styles.checkout_side}></Box>
      </Box>
    </>
  );
}
export default checkout;

export async function getServerSideProps(context) {
  connectDb();
  const session = await getSession(context);
  const user = await User.findById(session?.user.id);
  const cart = await Cart.findOne({ user: user._id });
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
