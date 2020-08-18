"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

var _uuidv = require("uuidv4");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUsersRepository {
  constructor() {
    this.Users = [];
  }

  async create({
    name,
    email,
    password
  }) {
    const user = new _User.default();
    Object.assign(user, {
      id: (0, _uuidv.uuid)(),
      name,
      email,
      password
    });
    this.Users.push(user);
    return user;
  }

  async findById(id) {
    const user = this.Users.find(userFind => userFind.id === id);
    return user;
  }

  async findByEmail(email) {
    const user = this.Users.find(userfind => userfind.email === email);
    return user;
  }

  async findAll() {
    return this.Users;
  }

  async save(users) {
    const userIndex = this.Users.findIndex(user => user.id === users.id);
    if (userIndex) this.Users[userIndex] = users;
    return users;
  }

}

var _default = FakeUsersRepository;
exports.default = _default;