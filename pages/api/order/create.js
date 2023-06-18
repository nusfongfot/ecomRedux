import nc from "next-connect";
import { connectDb, disconnectDb } from "@/utils/db";
import UserModel from "@/models/User";
import auth from "@/middleware/auth";
import OrderModel from "@/models/Order";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    connectDb();
    const { products, paymentMethod, total, shippingAddress } = req.body;
    const user = await UserModel.findById(req.user);
    const newOrder = await new OrderModel({
      user: user._id,
      products,
      paymentMethod,
      total,
      shippingAddress,
    }).save();

    disconnectDb();
    return res.status(200).json({ order_id: newOrder._id });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

export default handler;
