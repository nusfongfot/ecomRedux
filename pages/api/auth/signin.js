import connect from "next-connect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDb } from "@/utils/db";
import UserModel from "@/models/User";
const handler = connect();

const genToken = (payload) => {
  const privateKey = process.env.JWT_SECRET || "S3c12et";
  const options = { expiresIn: 60 * 60 * 6 }; //1s
  const token = jwt.sign(payload, privateKey, options);
  return token;
};

handler.post(async (req, res) => {
  try {
    await connectDb();
    const { email, password } = req.body;
    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      res.status(403).json("FORBIDDEN");
    }
    const hashedPassword = findUser.password;
    const isCorrect = await bcrypt.compare(password, hashedPassword);
    if (!isCorrect) {
      res.status(403).json("email or password is not correct");
    }
    const { _id: id, name } = findUser;
    const payload = { userId: id, name };
    const token = genToken(payload);
    const user = { ...findUser.toObject(), password: false };
    res.status(200).json({
      token,
      user,
      message: "Signin Successfully",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default handler;
