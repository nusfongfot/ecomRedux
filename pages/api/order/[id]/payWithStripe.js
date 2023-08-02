import nc from "next-connect";
import auth from "@/middleware/auth";
import { connectDb, disconnectDb } from "@/utils/db";
import OrderModel from "@/models/Order";

const stripe = require("stripe")(process.env.STRIPE_CLIENT_SECRET);

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    await connectDb();
    const { amount, id } = req.body;
    const order_id = req.query.id;
    const payment = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "USD",
      description: "MJ999B Store",
      payment_method: id,
      confirm: true,
    });
    const order = await OrderModel.findById(order_id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: payment.id,
        status: payment.status,
        email_address: payment.email_address,
      };
      await order.save();
      res.json({
        success: true,
      });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
    disconnectDb();
  } catch (error) {
    disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

export default handler;
