"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

const server = _http.default.createServer(app);

const sockets = (0, _socket.default)(server);
sockets.on('connection', socket => {
  console.log('Server connectedUsers', socket.id);
});
var _default = sockets;
exports.default = _default;