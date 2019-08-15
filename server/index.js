var express = require("express");
var app = express();
var server = app.listen(8810);
var io = require("socket.io").listen(server);
// const cors = require("cors");

// app.use(express.json(), cors());

io.on("connection", socket => {
  console.log("connected");
  console.log(socket.nsp.name);
  console.log(socket.handshake.url);
  socket.on("join", data => {
    socket.join(data.room);
    io.in(data.room).emit("new", "Bonne arrivée");
    socket.on("message", data => {
      io.in(data.room).emit("message", data.message);
    });
  });
});

server.on("listening", () =>
  console.info(`Chat server listening on port 8810`)
);
