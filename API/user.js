import axios from "axios";

export const applyCoupon = async (coupon) => {
  try {
    const { data } = await axios.post("/api/user/applyCoupon", { coupon });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const uploadImages = async (formData) => {
  const { data } = await axios.post("/api/cloudinary", formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return data;
};
