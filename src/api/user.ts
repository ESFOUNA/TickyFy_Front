// src/api/user.ts
import axios from "axios";
import API_BASE_URL from "./api";
import { authHeader } from "../utils/authHeader";

export const getProfile = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
    headers: authHeader(),
  });
  return res.data;
};
