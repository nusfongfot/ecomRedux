import nc from "next-connect";
import { connectDb, disconnectDb } from "@/utils/db";
import ProductModel from "@/models/Product";

const handler = nc();

handler.get(async (req, res) => {
  try {
    connectDb();
    const id = req.query.id;
    const style = req.query.style;
    const size = req.query.size;
    const product = await ProductModel.findById(id).lean();
    let discount = product.subProducts[style]?.discount;
    let priceBefore = product.subProducts[style]?.sizes[size]?.price;
    let price = discount ? priceBefore - priceBefore / discount : priceBefore;
    disconnectDb();
    return res.json({
      _id: product._id,
      style: Number(style),
      name: product.name,
      description: product.description,
      slug: product.slug,
      sku: product.subProducts[style]?.sku,
      brand: product.brand,
      shipping: product.brand,
      images: product.subProducts[style]?.images,
      color: product.subProducts[style]?.color,
      size:product.subProducts[style]?.sizes[size]?.size,
      price,
      priceBefore,
      quantity: product.subProducts[style]?.sizes[size]?.qty,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

export default handler;
