import LayoutProfile from "@/components/profile/layout";
import ProfileComponent from "@/components/profile/layout";
import Order from "@/models/Order";
import { getSession } from "next-auth/react";

export default function ProfilePage({ user, tab, orders }) {
  return (
    <div>
      <LayoutProfile session={user.user} tab={tab}>
        Orders
      </LayoutProfile>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  const tab = query.tab || 0;
  const filter = query.filter;
  let orders = [];
  if (!filter) {
    orders = await Order.find({ user: session?.user.id })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else if (filter == "paid") {
    orders = await Order.find({ user: session?.user.id, isPaid: true })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else if (filter == "unpaid") {
    orders = await Order.find({ user: session?.user.id, isPaid: false })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else {
    orders = await Order.find({ user: session?.user.id, status: filter })
      .sort({
        createdAt: -1,
      })
      .lean();
  }
  return {
    props: {
      user: session,
      tab,
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
