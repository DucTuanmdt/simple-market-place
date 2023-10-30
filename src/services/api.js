import axios from "axios";

// TODO: use environment variable later
const API_BASE_URL = "http://localhost:3003";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
