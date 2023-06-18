import nc from "next-connect";
import { connectDb, disconnectDb } from "@/utils/db";
import UserModel from "@/models/User";
import auth from "@/middleware/auth";

const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    connectDb();
    const { id } = req.body;
    let user = await UserModel.findById(req.user);
    let user_addresses = user.address;
    let addresses = [];
    for (let i = 0; i < user_addresses.length; i++) {
      let temp_address = {};
      if (user_addresses[i]._id == id) {
        temp_address = { ...user_addresses[i].toObject(), active: true };
        addresses.push(temp_address);
      } else {
        temp_address = { ...user_addresses[i].toObject(), active: false };
        addresses.push(temp_address);
      }
    }
    await user.updateOne({ address: addresses }, { new: true });
    disconnectDb();
    return res.json({ addresses });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    connectDb();
    const { id } = req.body;
    const user = await UserModel.findById(req.user);
    await user.updateOne(
      {
        $pull: { address: { _id: id } },
      },
      { new: true }
    );

    console.log("after", user.address.length);
    disconnectDb();
    return res.json({
      addresses: user.address.filter((item) => item._id != id),
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

export default handler;
