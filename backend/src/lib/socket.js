import { Server } from "socket.io"
import http from "http"
import express from "express"
const IP_ADDRESS = process.env.IP_ADDRESS;
const app = express();

const server = http.createServer(app);


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

