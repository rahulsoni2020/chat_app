const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});

const getUserSocketId = (userId) =>{
    return userSocketMap[userId];
}

const userSocketMap = {};

io.on("connection", (socket)=>{
    console.log("socket connected", socket.id);
    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId] = socket.id;
    }
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
    socket.on("disconnect", ()=>{
        delete userSocketMap.userId;
        console.log('disconnected');
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })
})

module.exports = {
    io, app, server, getUserSocketId
}