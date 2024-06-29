const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('call', (data) => {
    io.emit('call', data); // Broadcast to all connected clients
  });

  socket.on('answer', (data) => {
    io.emit('answer', data); // Broadcast to all connected clients
  });

  socket.on('ice-candidate', (data) => {
    io.emit('ice-candidate', data); // Broadcast to all connected clients
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
