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

// const connectedUsers: string[] = [];

interface IProps {
  x?: number;
  y?: number;
  scale?: number;
  rot?: number;
  delay?: number;
}
interface ICards {
  id: string;
  card?: string;
  cardUrl: string;
  styles?: IProps;
  showFront: boolean;
}
export interface ICardTarot {
  card: ICards;
}
interface IConnectedUser {
  userIO: string;
  user: string;
}
const connectedUsers: IConnectedUser[] = [];

sockets.on('connection', socket => {
  const { user } = socket.handshake.query;
  const connectedUser: IConnectedUser = {
    user,
    userIO: socket.id,
  };
  connectedUsers.push(connectedUser);

  socket.on('disconnect', () => {
    const userIndex = connectedUsers.findIndex(
      index => index.userIO === socket.id,
    );
    connectedUsers.splice(userIndex, 1);
    console.log(`> User disconnected on server with id: ${userIndex}`);
  });

  socket.on('cardTarot', (cardTarot: ICardTarot) => {
    console.log('cardTarot', cardTarot);

    connectedUsers.map(userCard => {
      if (userCard.userIO !== socket.id)
        return socket.to(userCard.userIO).emit('cardTarotServer', cardTarot);
      return null;
    });
  });

  socket.on('cardTarotOpenClient', (cardTarot: ICardTarot) => {
    console.log('cardTarotOpenClient', cardTarot);

    connectedUsers.map(userCard => {
      if (userCard.userIO !== socket.id)
        return socket.to(userCard.userIO).emit('onFlipCardServer', cardTarot);
      return null;
    });
  });

  socket.on('showScaleCardClient', (cardTarot: ICardTarot) => {
    console.log('showScaleCardClient', cardTarot);

    connectedUsers.map(userCard => {
      if (userCard.userIO !== socket.id)
        return socket
          .to(userCard.userIO)
          .emit('showScaleCardServer', cardTarot);
      return null;
    });
  });
  console.log('Server connectedUsers', connectedUsers);
});

app.use((request: Request, response: Response, next: NextFunction) => {
  request.io = sockets;
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
