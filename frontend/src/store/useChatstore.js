import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthstore } from "./useAuthstore";

export const useChatstore = create((set, get) => ({
    messages: [],
    isMessagesLoading: false,

    getchatmessages: async () => {
        set({ isMessagesLoading: true });
        try {
            const result = await axiosInstance.get("/messages/receive");

            if (!Array.isArray(result.data)) {
                console.error("Expected an array but got:", result.data);
                toast.error("Unexpected data format from server");
                return;
            }

            set({ messages: result.data });
        } catch (error) {
            console.error("Error details:", error);
            toast.error(error.response?.data?.message || "Failed to load messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendchatmessage: async (messagedata) => {
        try {
            await axiosInstance.post("/messages/send", messagedata);
            toast.success("Message sent successfully");
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },

    deletechatmessage: async (messageId) => {
        try {
            await axiosInstance.delete(`/messages/delete/${messageId}`);
            toast.success("Message deleted successfully");

            // Remove from local state
            set((state) => ({
                messages: state.messages.filter(msg => msg._id !== messageId)
            }));
        } catch (error) {
            console.error("Error deleting message:", error);
            toast.error(error.response?.data?.message || "Failed to delete message");
        }
    },

    subscribeToMessages: () => {
        const socket = useAuthstore.getState().socket;

        // Avoid duplicate listeners
        socket.off("newMessage");
        socket.off("messageDeleted");

        socket.on("newMessage", (newMessage) => {
            set((state) => {
                const isDuplicate = state.messages.some(msg => msg._id === newMessage._id);
                if (isDuplicate) return state;

                return { messages: [...state.messages, newMessage] };
            });
        });

        socket.on("messageDeleted", ({ _id }) => {
            set((state) => ({
                messages: state.messages.filter(msg => msg._id !== _id)
            }));
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthstore.getState().socket;
        socket.off("newMessage");
        socket.off("messageDeleted");
    },
}));
