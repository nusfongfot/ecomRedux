import axios from "axios";

export const register = (formData) => axios.post("/api/auth/singup", formData);
export const login = (formData) => axios.post("/api/auth/signin", formData);
