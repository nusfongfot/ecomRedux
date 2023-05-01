import nc from "next-connect";
import { connectDb, disconnectDb } from "@/utils/db";
import ProductModel from "@/models/Product";

const handler = nc();

handler.post(async (req, res) => {
  try {
    connectDb();
    const promises = req.body.products.map(async (p) => {
      let dbProduct = await ProductModel.findById(p._id).lean();
      let orginalPrice = dbProduct.subProducts[p.style].sizes.find(
        (v) => v.size == p.size
      ).price;
      let quantity = dbProduct.subProducts[p.style].sizes.find(
        (v) => v.size == p.size
      ).qty;
      let discount = dbProduct.subProducts[p.style].discount;
      return {
        ...p,
        priceBefore: orginalPrice,
        price:
          discount > 0 ? orginalPrice - orginalPrice / discount : orginalPrice,
        discount,
        quantity,
        shippingFee: dbProduct.shipping,
      };
    });

    const data = await Promise.all(promises);
    disconnectDb();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

export default handler;
