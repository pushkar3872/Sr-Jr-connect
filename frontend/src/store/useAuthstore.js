import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = `http://${window.location.hostname}:4005`;

export const useAuthstore = create((set, get) => ({
    authUser: null,
    isregistering: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const result = await axiosInstance.get("/auth/check");
            set({ authUser: result.data });

            get().connectSocket();
        } catch (error) {
            console.log("Error in checkauth : ", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    register: async (data) => {
        set({ isregistering: true });
        // console.log(data);
        try {
            const result = await axiosInstance.post("/auth/register", data);
            set({ authUser: result.data });


            get().connectSocket();
            toast.success("Account Created Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isregistering: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const result = await axiosInstance.post("/auth/login", data);
            set({ authUser: result.data });
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");

            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    update: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const result = await axiosInstance.put("/auth/update", data);
            set({ authUser: result.data });
            toast.success("Profile Updated Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    deleteUser: async () => {
        try {
            await axiosInstance.delete("/auth/delete");
            set({ authUser: null });
            toast.success("Account Deleted Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) {
            return;
        }
        // connecting to socket io
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            }
        });
        socket.connect();
        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
        });

        socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) {
            get().socket.disconnect();
        }
    },
}));
