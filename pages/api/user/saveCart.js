import nc from "next-connect";
import { connectDb, disconnectDb } from "@/utils/db";
import ProductModel from "@/models/Product";
import CartModel from "@/models/Cart";
import UserModel from "@/models/User";
import auth from "@/middleware/auth";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    connectDb();
    const { cart } = req.body;
    let products = [];
    let user = await UserModel.findById(req.user);
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

    // const newCart = new CartModel({
    //   products,
    //   cartTotal: cartTotal.toFixed(2),
    //   user: user._id,
    // });
    // await newCart.save();

    await new CartModel({
      products,
      cartTotal: cartTotal.toFixed(2),
      user: user._id,
    }).save();
    disconnectDb();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

export default handler;
