import nc from "next-connect";
import { connectDb, disconnectDb } from "@/utils/db";
import UserModel from "@/models/User";
import auth from "@/middleware/auth";
import CouponModel from "@/models/Coupon";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    connectDb();
    const { coupon, startDate, endDate, discount } = req.body;
    const test = await CouponModel.findOne({ coupon });
    if (test) {
      return res.status(400).json({ msg: "This Coupon already exists" });
    }
    await new CouponModel({
      coupon,
      startDate,
      endDate,
      discount,
    }).save();

    disconnectDb();
    return res
      .status(200)
      .json({
        msg: "Coupon created SuccessFully!",
        coupons: await CouponModel.find({}),
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

export default handler;
