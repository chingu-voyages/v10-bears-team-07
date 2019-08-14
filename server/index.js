var express = require("express");
var app = express();
var server = app.listen(8810);
var io = require("socket.io").listen(server);

const chaine = io.of("/channels");

chaine.on("connection", socket => {
  console.log("connected...");
  socket.on("join", data => {
    console.log(data);
    socket.join(data.room);
    chaine
      .in(data.room)
      .emit("wellcome", `New user joined the ${data.room} room`);
  });
  socket.on("message", data => {
    chaine.in(data.room).emit("message", data.message);
  });
});
server.on("listening", () =>
  console.info(`Chat server listening on port 8810`)
);
