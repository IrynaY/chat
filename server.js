const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const moniker = require('moniker');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.use(express.static('./public'));

io.on('connection', function (socket) {
  socket.username = moniker.choose();

  socket.emit('set username', {
    name: socket.username,
    timestamp: new Date().getTime(),
  });

  socket.broadcast.emit('user joined', {
    name: socket.username,
    timestamp: new Date().getTime(),
  });

  socket.on('chat message', (message) => {
    const answer = {
      message,
      timestamp: new Date().getTime()
    };
    socket.emit('self', answer);
    answer.name =  socket.username;
    socket.broadcast.emit('chat message', answer);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user left', {
      name: socket.username,
      timestamp: new Date().getTime(),
    });
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      name: socket.username
    });
  });

  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      name: socket.username
    });
  });

});

server.listen(port, () => {
  /* eslint no-console: off */
  console.log('listening on *: ' + port);
});
