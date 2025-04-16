import { Router } from "express";
import { delete_message, getMessages, sendMessage } from "../controllers/messageController.js";
import { protectroute } from "../middleware/auth.middleware.js";

const messageRouter = Router();

messageRouter.post("/send", protectroute, sendMessage);
messageRouter.get("/receive", protectroute, getMessages);
messageRouter.delete("/delete/:messageId", protectroute, delete_message); // <== added protectroute

export default messageRouter;
