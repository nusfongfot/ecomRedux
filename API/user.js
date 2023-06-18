import axios from "axios";

export const applyCoupon = async (coupon) => {
  try {
    const { data } = await axios.post("/api/user/applyCoupon", { coupon });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
