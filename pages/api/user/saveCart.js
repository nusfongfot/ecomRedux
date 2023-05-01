import nc from "next-connect";
import { connectDb, disconnectDb } from "@/utils/db";
import ProductModel from "@/models/Product";
import CartModel from "@/models/Cart";
import User from "@/models/User";

const handler = nc();

handler.post(async (req, res) => {
  try {
    connectDb();
    const { cart, user_id } = req.body;
    let products = [];
    let user = await User.findById(user_id);
    let existting_cart = await CartModel.findOne({ user: user._id });
    if (existting_cart) {
      await existting_cart.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let dbProduct = await ProductModel.findById(cart[i]._id).lean();
      let subProduct = dbProduct.subProducts[cart[i].style];
      let tempProduct = {};
      tempProduct.name = dbProduct.name;
      tempProduct.product = dbProduct._id;
      tempProduct.color = {
        color: cart[i].color.color,
        image: cart[i].color.image,
      };
      tempProduct.image = subProduct.images[0].url;
      tempProduct.qty = Number(cart[i].qty);
      tempProduct.size = cart[i].size;
      let price = Number(
        subProduct.sizes.find((p) => p.size == cart[i].size).price
      );
      tempProduct.price =
        subProduct.discount > 0
          ? (price - price / Number(subProduct.discount)).toFixed(2)
          : price.toFixed(2);

      products.push(tempProduct);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].qty;
    }
    await new CartModel({
      products,
      cartTotal: cartTotal.toFixed(2),
      user: user_id,
    }).save();

    disconnectDb();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

export default handler;
