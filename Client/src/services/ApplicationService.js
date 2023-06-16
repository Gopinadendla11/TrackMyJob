import axios from "axios";
import { BASE_API_URL } from "../env.js";
const URL = `${BASE_API_URL}/api/applications`;

const LOCAL_STORAGE_TOKEN = "tmj_token";

const config = {
  headers: { "x-jwt-token": localStorage.getItem(LOCAL_STORAGE_TOKEN) },
};

export const AddNewApplication = async (applicationData) => {
  const response = await axios
    .post(`${URL}/new`, applicationData, config)
    .catch((error) => error.response);
  return response;
};

export const GetApplications = async () => {
  const response = await axios
    .get(`${URL}/`, config)
    .catch((error) => error.response);
  return response.data;
};

export const GetApplicationStats = async () => {
  const response = await axios
    .get(`${URL}/stats`, config)
    .catch((error) => error.response);
  return response;
};

export const DeleteApplications = async (data) => {
  const response = await axios
    .post(`${URL}/delete`, data, config)
    .catch((error) => error.response);
  return response;
};

export const UpdateStatus = async (data) => {
  const response = await axios
    .put(`${URL}/edit`, data, config)
    .catch((error) => error.response);
  return response;
};
