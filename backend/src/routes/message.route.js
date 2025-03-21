import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import { protectroute } from "../middleware/auth.middleware.js";

const messageRouter = Router();

messageRouter.post("/send", protectroute, sendMessage);
messageRouter.get("/receive", protectroute, getMessages);


export default messageRouter;