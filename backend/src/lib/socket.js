import { Server } from "socket.io"
import https from "https"
import http from "http"
import express from "express"
import fs from "fs"
import path from "path"

const __dirname = path.resolve();
const IP_ADDRESS = process.env.IP_ADDRESS;
const app = express();

let server;

try {
    const options = {
        key: fs.readFileSync(path.join(__dirname, "src", "certs", "server.key")),
        cert: fs.readFileSync(path.join(__dirname, "src", "certs", "server.cert"))
    };
    server = https.createServer(options, app);
    console.log("Server running in HTTPS mode");
} catch (error) {
    console.log("SSL certificates not found, falling back to HTTP");
    server = http.createServer(app);
}
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});


export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}


// stores online users here {userID,socketID}
const userSocketMap = {};


io.on("connection", (socket) => {
    console.log("a user connected :", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
    }
    // send to every connected user that user with id 'userId' is online 
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user Disconnected : ", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export { io, app, server };

