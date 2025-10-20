import axios from 'axios';
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://your-backend.onrender.com',
  withCredentials: true,
});

// Attach token from localStorage if present (for Authorization header)
API.interceptors.request.use(cfg => {
  const t = localStorage.getItem('pods_token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export default API;
