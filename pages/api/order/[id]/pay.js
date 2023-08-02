import nc from "next-connect";
import auth from "@/middleware/auth";
import { connectDb, disconnectDb } from "@/utils/db";
import OrderModel from "@/models/Order";

const handler = nc().use(auth);

handler.put(async (req, res) => {
  console.log("hello from api");
  await connectDb();
  const order = await OrderModel.findById(req.qurey.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const newOrder = await order.save();
    await disconnectDb();
    res.json({ message: "Order is paid.", order: newOrder });
  } else {
    await db.disconnectDb();
    res.status(404).json({ message: "Order is not found." });
  }
});

export default handler;
