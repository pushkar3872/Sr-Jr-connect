import { Server } from "socket.io";
import http from "http";
import express from "express";
import path from "path";

const __dirname = path.resolve();
const app = express();

// Create HTTP server (Render handles HTTPS)
const server = http.createServer(app);

// Initialize Socket.IO with CORS settings
const io = new Server(server, {
  cors: {
    origin: ["https://sr-jr-connect.onrender.com", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ['websocket', 'polling']
});

// User socket mapping
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Helper function to get a user's socket ID
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { io, app, server };