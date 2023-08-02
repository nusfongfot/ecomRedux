import nc from "next-connect";
import { connectDb, disconnectDb } from "@/utils/db";
import auth from "@/middleware/auth";
import CategoryModel from "@/models/Category";
import slugify from "slugify";
import SubCategory from "@/models/Subcategory";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    connectDb();
    // console.log(req.body)
    const { name, parent } = req.body;
    console.log({ name, parent });
    const test = await SubCategory.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "SubCategory already exist, Try a different name" });
    }
    const data = await new SubCategory({ name, parent, slug: slugify(name) });
    console.log({data})
    // disconnectDb();
    console.log('=========');

    return res.json({
      
      message: `SubCategory ${name} has been created successfully.`,
      subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    console.log({error})
    disconnectDb();
    res.status(500).json({ message: error.message });
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

handler.get(async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.json([]);
    }
    connectDb();
    const results = await SubCategory.find({ parent: category }).select("name");
    disconnectDb();
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
