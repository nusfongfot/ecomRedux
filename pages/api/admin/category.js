import nc from "next-connect";
import { connectDb, disconnectDb } from "@/utils/db";
import UserModel from "@/models/User";
import auth from "@/middleware/auth";
import CouponModel from "@/models/Coupon";
import CategoryModel from "@/models/Category";
import slugify from "slugify";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    connectDb();
    const { name } = req.body;
    const test = await CategoryModel.findOne({ name });

    if (test) {
      return res.status(400).json({ message: "Category is already exist" });
    }
    await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    disconnectDb();
    console.log('postttttttttttt');
    return res.status(200).json({
      message: `Category ${name} created successfully`,
      categories: await CategoryModel.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    connectDb();
    const { id } = req.body;
    await CategoryModel.findByIdAndDelete(id);
    disconnectDb();
    return res.status(200).json({
      message: "Category has been deleted successfully!",
      categories: await CategoryModel.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
