"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _cors = _interopRequireDefault(require("cors"));

var _celebrate = require("celebrate");

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _rateLimited = _interopRequireDefault(require("./middiewares/rateLimited"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

require("../../container");

var _routes = _interopRequireDefault(require("./routes"));

require("../typeorm");

require("moment/locale/pt-br");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const server = new _http.default.Server(app);
const sockets = (0, _socket.default)(server);
const connectedUsers = [];
let user;
sockets.on('connection', socket => {
  user = socket.id;
  connectedUsers.push(user);
  socket.on('disconnect', () => {
    const userIndex = connectedUsers.findIndex(index => index === user);
    connectedUsers.splice(userIndex, 1);
    console.log(`> User disconnected on server with id: ${user}`);
  });
  console.log('Server connectedUsers', connectedUsers); // console.log('< User CONNECTED on server with id:', user);
});
app.use((request, response, next) => {
  request.io = sockets;
  request.ioUser = user;
  request.connectedUsers = connectedUsers;
  return next();
});
app.use(_express.default.json());
app.use('/files', _express.default.static(_upload.default.pathUploads));
app.use(_rateLimited.default);
app.use((0, _cors.default)());
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((err, request, response, next) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
}); // app.listen(3333, () => {
//   console.log('👀 Server started port 3333');
// });
// server.listen(3333);

server.listen(3333, () => {
  console.log('👀 Server started port 3333');
});