import { getToken } from "next-auth/jwt";

export default async (req, res, next) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV == "production",
  });
  if (token) {
    //sign in
    req.user = token.sub;
    next();
  } else {
    res.status(401).json({ msg: "Not Sign in" });
  }
  res.end;
};
