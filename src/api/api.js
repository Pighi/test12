import axios from "axios";
import API from '../api/api';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // must match backend URL
  withCredentials: true, // important for cross-origin cookies
});

const addObservation = async (plantName, description, dateObserved) => {
  try {
    const res = await API.post('/observations/add', {
      plantName,
      description,
      dateObserved
    });
    console.log('Observation added:', res.data);
    // maybe update state here to show new observation in UI
  } catch (err) {
    console.error('Failed to add observation:', err);
  }
};

API.interceptors.request.use(config => {
  const token = localStorage.getItem("pods_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
