import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

sockets.on('connection', socket => {
  console.log('Server connectedUsers', socket.id);
});

export default sockets;
