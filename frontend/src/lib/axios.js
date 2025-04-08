import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:4005/api"
      : `http://${import.meta.env.VITE_IP_ADDRESS}:4005/api`,
  withCredentials: true,
});
