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

            // console.log("Full API response:", result);       // Debugging
            // console.log("Response data type:", typeof result.data);
            // console.log("Is Array?", Array.isArray(result.data));

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
        // const { selectedUser } = get()
        // if (!selectedUser) {
        //     return;
        // }

        const socket = useAuthstore.getState().socket;


        socket.on("newMessage", (newMessage) => {
            // if (newMessage.senderId !== selectedUser._id) {
            //     return;
            // }
            set({
                messages: [...get().messages, newMessage],
            })
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthstore.getState().socket;
        socket.off("newMessage");
    },
}));
