const { log } = require("console");
const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 8089;

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });

  socket.on("disconnected", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Running on port ws://localhost:${PORT}`);
});
