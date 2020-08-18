"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new _AppError.default('JWT token is missing', 401);
  const [, token] = authHeader.split(' ');
  (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret, (err, decoded) => {
    const socket = request.io;
    const {
      ioUser
    } = request;

    if (err instanceof _jsonwebtoken.TokenExpiredError) {
      socket.to(ioUser).emit('loggout');
      return response.status(204).json();
    }

    if (err) throw new _AppError.default(err.message, 401);
    const {
      sub
    } = decoded;
    request.user = {
      id: sub
    };
    return next();
  });
}