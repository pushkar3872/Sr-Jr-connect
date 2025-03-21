import cloudinary from "../config/cloudinary.js";
import { decryptMessage, encryptMessage } from "../lib/encryption.js";
import Message from "../models/MessageModel.js"


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
            senderId: newMessage.senderId,
            text: decryptMessage(newMessage.text),
            image: newMessage.image,
            createdAt: newMessage.createdAt
        }

        res.status(200).json(decryptednewmessage);

    } catch (error) {
        console.error("Error in sendMessage:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Messages (Decrypt Before Sending to SrJrUser)
export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 }); // Sort by createdAt (oldest to newest)

        // Decrypt each message before sending to the frontend
        const decryptedMessages = messages.map(msg => ({
            _id: msg._id,
            senderId: msg.senderId,
            text: decryptMessage(msg.text),
            image: msg.image,
            createdAt: msg.createdAt
        }));

        res.status(200).json(decryptedMessages);
    } catch (error) {
        console.error("Error in getMessages:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
