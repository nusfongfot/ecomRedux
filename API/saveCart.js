import axios from "axios";

export const saveCart = (cart, user_id) => {
  try {
    const { data } = axios.post("/api/user/saveCart", { cart, user_id });
    return data;
  } catch (error) {
    return response.data.error.message;
  }
};
