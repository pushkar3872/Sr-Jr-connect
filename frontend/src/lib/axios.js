import axios from "axios"
export const axiosInstance = axios.create({
    baseURL: window.location.hostname === "localhost"
        ? "http://localhost:4005/api"  // Local development
        : "http://192.168.0.108:4005/api", // Public access
    withCredentials: true,
});
