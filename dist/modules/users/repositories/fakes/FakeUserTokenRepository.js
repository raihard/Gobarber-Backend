"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _UserToken = _interopRequireDefault(require("../../infra/typeorm/entities/UserToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUserTokenRepository {
  constructor() {
    this.usersTokens = [];
  }

  async create(user_id) {
    const userToken = new _UserToken.default();
    Object.assign(userToken, {
      id: (0, _uuidv.uuid)(),
      user_id,
      token: (0, _uuidv.uuid)()
    });
    userToken.created_at = new Date(Date.now());
    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByToken(token) {
    const userToken = await this.usersTokens.find(tokenid => tokenid.token === token);
    return userToken;
  }

}

var _default = FakeUserTokenRepository;
exports.default = _default;