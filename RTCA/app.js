const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes.js');
const chatRoomRoutes = require('./routes/chatRoomRoutes.js');
const db = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware untuk koneksi WebSocket
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middleware
app.use(bodyParser.json());

// Gunakan userRoutes untuk endpoint /register
app.use('/', userRoutes);

// Gunakan chatRoomRoutes untuk endpoint /create-room
app.use('/', chatRoomRoutes);

// Endpoint untuk koneksi WebSocket
app.get('/socket.io', (req, res) => {
  // Gunakan socket.io untuk menangani koneksi WebSocket
  io.on('connection', (socket) => {
    console.log('User connected via WebSocket');

    // Event untuk menangani pesan dari klien
    socket.on('chat message', (msg) => {
      console.log('Message from client via WebSocket:', msg);
      
      // Mengirim pesan ke semua klien terhubung
      io.emit('chat message', msg);
    });

    // Event untuk menangani ketika koneksi ditutup
    socket.on('disconnect', () => {
      console.log('User disconnected via WebSocket');
    });
  });

  // Respon HTTP sukses untuk permintaan WebSocket
  res.sendStatus(200);
});

// Mulai server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
