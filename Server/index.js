const express = require("express");
const app = express();
require("dotenv").config()
const Message = require("./Models/Message")
require("./db/connection")
app.use(express.json())
app.use(require("./Router/auth"))
const { createServer } = require("http")
const { Server } = require("socket.io")
const httpServer = createServer();
const io = new Server(httpServer, {});


io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("disconnect", () => {
        console.log("disconnected", socket.id);
    })

    socket.on("joinRoom", (data) => {
        console.log("user join with", socket.id, data.roomid)
        socket.join(data)
    })

    socket.on("sendMessage", (data) => {
        console.log("message", data)
        io.emit("reciveMessage", data)
    })
})

httpServer.listen(5000)
app.listen(3000)