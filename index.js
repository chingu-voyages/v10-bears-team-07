if (process.env.NODE_ENV != 'production') {
  require('dotenv').config({ path: '.env.development.local' });
}

var express = require('express');
var cors = require('cors');
var morgan = require('morgan');

var app = express();
app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cors(),
  morgan('dev')
);

var setupRoutes = require('./src/routes/');
setupRoutes(app);

// socket.io server
const chatPort = process.env.CHAT_PORT || 3010;
var server = app.listen(chatPort);
var io = require('socket.io').listen(server);

io.on('connection', socket => {
  socket.on('join', data => {
    socket.join(data.room);
    io.in(data.room).emit('new', 'Bonne arrivée');
    socket.on('message', data => {
      io.in(data.room).emit('message', data.message);
    });
  });
});

server.on('listening', () =>
  console.info(`Chat server listening on port ${chatPort}`)
);

// Deployment code
if (process.env.NODE_ENV == 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.info(`App connected to port ${PORT}`));

var mongoose = require('mongoose');
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/v10-bears-07';
mongoose.connect(
  DB_URI,
  { useNewUrlParser: true, useFindAndModify: false },
  () => console.info(`Connected to ${DB_URI}`)
);
