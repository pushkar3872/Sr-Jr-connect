import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4005/api", // Removed extra space
    withCredentials: true, // Ensures cookies are sent with requests
});
