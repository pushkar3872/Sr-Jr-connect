import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useUserHandler = create((set) => ({
    allUsers: [],
    isLoadingUsers: false,
    selectedUser: null,
    isUpdatingUser: false,

    // Fetch all users from the database
    fetchAllUsers: async () => {
        set({ isLoadingUsers: true });
        try {
            const result = await axiosInstance.get("/auth/users");
            set({ allUsers: [...result.data] });
        } catch (error) {
            toast.error("Failed to fetch users");
            console.error("Error fetching users: ", error);
        } finally {
            set({ isLoadingUsers: false });
        }
    },

    // Fetch a single user by ID
    fetchUserById: async (userId) => {
        try {
            const result = await axiosInstance.get(`/auth/users/${userId}`);
            set((state) => ({ allUsers: state.allUsers.map(user => user._id === userId ? result.data : user) }));
        } catch (error) {
            toast.error("Failed to fetch user details");
            console.error("Error fetching user: ", error);
        }
    },

    // Update a user by ID
    updateUserById: async (userId, data) => {
        set({ isUpdatingUser: true });
        try {
            const result = await axiosInstance.put(`/auth/users/${userId}`, data);
            set((state) => ({
                allUsers: state.allUsers.map(user => user._id === userId ? result.data : user),
            }));
            toast.success("User updated successfully");
        } catch (error) {
            toast.error("Failed to update user");
            console.error("Error updating user: ", error);
        } finally {
            set({ isUpdatingUser: false });
        }
    },

    // Delete a user by ID
    deleteUserById: async (userId) => {
        try {
            await axiosInstance.delete(`/auth/users/${userId}`);
            set((state) => ({ allUsers: state.allUsers.filter(user => user._id !== userId) }));
            toast.success("User deleted successfully");
        } catch (error) {
            toast.error("Failed to delete user");
            console.error("Error deleting user: ", error);
        }
    },
}));
