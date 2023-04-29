import connect from "next-connect";
import bcrypt from "bcrypt";
import { genToken } from "@/utils/token";
import { connectDb } from "@/utils/db";
import UserModel from "@/models/User";
const handler = connect();

handler.post(async (req, res) => {
  try {
    await connectDb();
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      res.status(400).json({ msg: "Please Fill all fields" });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "This email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const saveUser = new UserModel({
      fullname,
      email,
      password: hashedPassword,
    });
    const newUser = await saveUser.save();
    const token = genToken({ id: newUser._id.toString() });
    // const url = `${process.env.BASE_URL}/activate/${token}`
    res.status(200).json({ newUser, token, msg: "Sing Up Succesfully!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default handler;
