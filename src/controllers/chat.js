const server = require("http").createServer(app);
const io = require("socket.io")(server);

let liveChannels = [];
function chat(req, res) {
  const channelName = req.params.name;
  if (!liveChannels.includes(channelName)) {
    liveChannels.push(channelName);
    console.info(liveChannels);
    chaine = io.of(`/${channelName}`);
    chaine.on("connection", socket => {
      console.info(`Nouveau connecté à la ${channelName}`);
      chaine.emit("message", `soyez le bienvenu sur la ${channelName}`);
      socket.on("add message", message => {
        chaine.emit("add message", message);
      });
    });
  }
}

server.listen(() => console.info("socket server is listening"));
