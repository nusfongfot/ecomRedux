import nc from "next-connect";
import { connectDb, disconnectDb } from "@/utils/db";
import UserModel from "@/models/User";
import auth from "@/middleware/auth";
import CouponModel from "@/models/Coupon";
import CartModel from "@/models/Cart";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    connectDb();
    const { coupon } = req.body;
    const user = await UserModel.findById(req.user);
    const checkCoupon = await CouponModel.findOne({ coupon });

    if (checkCoupon == null) {
      return res.json({ msg: "Invalid Coupon!" });
    }
    const { cartTotal } = await CartModel.findOne({ user: req.user });
    let totalAfterDiscount =
      cartTotal - (cartTotal * checkCoupon.discount) / 100;
    await CartModel.findOneAndUpdate(
      { user: user._id },
      { totalAfterDiscount },
      { new: true }
    );

    disconnectDb();
    return res.status(200).json({
      totalAfterDiscount: totalAfterDiscount.toFixed(2),
      discount: checkCoupon.discount,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

export default handler;
