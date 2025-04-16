import cloudinary from "../config/cloudinary.js";
import { decryptMessage, encryptMessage } from "../lib/encryption.js";
import Message from "../models/MessageModel.js"
import SrJrUser from "../models/UserModel.js";
import { io } from "../lib/socket.js";

// Send Message (Encrypt Before Storing)
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const myid = req.SrJrUser._id;

        // Encrypt the message
        const encryptedText = encryptMessage(text);


        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId: myid,
            text: encryptedText,
            image: imageUrl,
        });

        await newMessage.save();
        const decryptednewmessage = {
            _id: newMessage._id,
            sender: await getUserfromId(newMessage.senderId),
            text: decryptMessage(newMessage.text),
            image: newMessage.image,
            createdAt: newMessage.createdAt
        }

        io.emit("newMessage", decryptednewmessage);


        res.status(200).json(decryptednewmessage);

    } catch (error) {
        console.error("Error in sendMessage:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Messages (Decrypt Before Sending to SrJrUser)
export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 }); // Oldest to newest

        // FIX: Use Promise.all to resolve all sender details asynchronously
        const decryptedMessages = await Promise.all(
            messages.map(async (msg) => ({
                _id: msg._id,
                sender: await getUserfromId(msg.senderId), // Await here!
                text: decryptMessage(msg.text),
                image: msg.image,
                createdAt: msg.createdAt
            }))
        );

        res.status(200).json(decryptedMessages);
    } catch (error) {
        console.error("Error in getMessages:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



const getUserfromId = async (senderid) => {
    try {
        const user = await SrJrUser.findById(senderid).select("-password");

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.error("Error in getUserfromId:", error.message);
        return null;
    }
}

export const delete_message = async (req, res) => {
    try {
        const { messageId } = req.params;

        // Find and delete the message
        const deletedMessage = await Message.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }

        // Emit real-time deletion event
        io.emit("messageDeleted", { _id: deletedMessage._id });

        res.status(200).json({ message: "Message deleted successfully", id: deletedMessage._id });
    } catch (error) {
        console.error("Error in delete_message:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
