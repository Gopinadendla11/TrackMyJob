import axios from "axios";
import { BASE_API_URL } from "../env.js";
const API_URL = `${BASE_API_URL}/api/user`;

const LOCAL_STORAGE_TOKEN = "tmj_token";

const config = {
  headers: { "x-jwt-token": localStorage.getItem(LOCAL_STORAGE_TOKEN) },
};

export const GetUserData = async () => {
  const response = await axios
    .get(`${API_URL}`, config)
    .catch((error) => error.response);

  return response;
};

export const UpdateUserData = async (userdata) => {
  const response = await axios
    .post(`${API_URL}/edit`, userdata, config)
    .catch((error) => error.response);

  return response;
};
