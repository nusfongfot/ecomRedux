import jwt from "jsonwebtoken";
export const genToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVE_TOKEN, {
    expiresIn: "1d",
  });
};
