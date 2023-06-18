import nc from "next-connect";
import { connectDb, disconnectDb } from "@/utils/db";
import UserModel from "@/models/User";
import auth from "@/middleware/auth";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    connectDb();
    const { address } = req.body;
    const userId = req.user;

    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $push: { address } }, // Use $push to add the new address to the array
      { new: true }
    );

    disconnectDb();
    return res.status(200).json({ addresses: user.address });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

export default handler;
