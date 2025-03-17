import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const AlluserStore = create((set, get) => ({
    users: null,
    isUsersLoading: false,
    getUsersforleaderboard: async () => {
        set({ isUsersLoading: true });
        try {
            const result = await axiosInstance.get("/Users");
            set({ users: result.data });

        } catch (error) {
            toast.error(error.response.message);
        }
        finally {
            set({ isUsersLoading: false });
        }
    }

}))