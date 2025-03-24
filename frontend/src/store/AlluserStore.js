import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const AlluserStore = create((set, get) => ({
    users: [],
    sortedUsers: null,
    isUsersLoading: false,

    getUsersforleaderboard: async () => {
        set({ isUsersLoading: true });
        try {
            const result = await axiosInstance.get("users/batchusers");
            set({ sortedUsers: result.data || [] }); // Ensure it's always an array
        } catch (error) {
            console.error("Error fetching leaderboard users:", error);
            toast.error(error.response?.data?.message || "Failed to load leaderboard data");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getAllStudents: async () => {
        set({ isUsersLoading: true });
        try {
            const result = await axiosInstance.get("users/allusers");
                
            console.log(Array.isArray(result.data));
            
            set({ users: result.data || [] }); // Ensure it's always an array
        } catch (error) {
            console.error("Error fetching all users:", error);
            toast.error(error.response?.data?.message || "Failed to load users");
        } finally {
            set({ isUsersLoading: false });
        }
    }
}));

export default AlluserStore;
