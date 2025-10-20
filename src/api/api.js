import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // must match backend URL
  withCredentials: true, // important for cross-origin cookies
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("pods_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
