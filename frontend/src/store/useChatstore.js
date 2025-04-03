import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthstore } from "./useAuthstore";

export const useChatstore = create((set, get) => ({
    messages: [],
    isMessagesLoading: false,

    getchatmessages: async () => {
        set({ isMessagesLoading: true })
        try {
            // console.log("Making API request...");      // Debugging
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
        // set({ isMessagesLoading: true });
        try {
            await axiosInstance.post("/messages/send", messagedata);

            toast.success("Message sent successfully");
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(error.response?.data?.message || "Failed to send message");
        }

    },
    subscribeToMessages: () => {
        const socket = useAuthstore.getState().socket;

        // Remove any existing listener before adding a new one
        socket.off("newMessage");

        socket.on("newMessage", (newMessage) => {
            set((state) => {
                // Avoid adding duplicate messages
                const isDuplicate = state.messages.some(msg => msg._id === newMessage._id);
                if (isDuplicate) return state;

                return { messages: [...state.messages, newMessage] };
            });
        });
    },


    unsubscribeFromMessages: () => {
        const socket = useAuthstore.getState().socket;
        socket.off("newMessage");
    },
}));
