import nc from "next-connect";
import User from "@/models/User";
import auth from "@/middleware/auth";
import { connectDb, disconnectDb } from "@/utils/db";
const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    connectDb();
    const { product_id, style } = req.body;
    const user = await User.findById(req.user);
    // const exist = user.wishlist.find(
    //   (x) => x.product == product_id && x.style == style
    // );
    // if (exist) {
    //   return res
    //     .status(400)
    //     .json({ message: "Product already exists in your wishlist." });
    // }

    await user.updateOne({
      $push: {
        wishlist: {
          product: product_id,
          style,
        },
      },
    });

    disconnectDb();
    return res
      .status(200)
      .json({ message: "Product succesfully added to your wishlist." });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
