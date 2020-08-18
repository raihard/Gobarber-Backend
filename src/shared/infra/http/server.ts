import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import UploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimited from '@shared/infra/http/middiewares/rateLimited';
import http from 'http';
import socketio from 'socket.io';
import '@shared/container';
import routes from './routes';
import '../typeorm';
import 'moment/locale/pt-br';

const app = express();

const server = new http.Server(app);
const sockets = socketio(server);

const connectedUsers: string[] = [];
let user: string;

sockets.on('connection', socket => {
  user = socket.id;
  connectedUsers.push(user);

  socket.on('disconnect', () => {
    const userIndex = connectedUsers.findIndex(index => index === user);
    connectedUsers.splice(userIndex, 1);
    console.log(`> User disconnected on server with id: ${user}`);
  });

  console.log('Server connectedUsers', connectedUsers);
  // console.log('< User CONNECTED on server with id:', user);
});

app.use((request: Request, response: Response, next: NextFunction) => {
  request.io = sockets;
  request.ioUser = user;
  request.connectedUsers = connectedUsers;
  return next();
});

app.use(express.json());
app.use('/files', express.static(UploadConfig.pathUploads));
app.use(rateLimited);
app.use(cors());

app.use(routes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    console.log(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

// app.listen(3333, () => {
//   console.log('👀 Server started port 3333');
// });

// server.listen(3333);
server.listen(3333, () => {
  console.log('👀 Server started port 3333');
});
