"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IHashPassword = _interopRequireDefault(require("../providers/HashPassword/IHashPassword"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateProfileUserServices = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashPassword')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IHashPassword.default === "undefined" ? Object : _IHashPassword.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateProfileUserServices {
  constructor(usersRepository, hashPassword) {
    this.usersRepository = usersRepository;
    this.hashPassword = hashPassword;
  }

  async execute({
    user_id,
    name,
    email,
    password,
    oldpassword
  }) {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new _AppError.default('User not found', 401);
    const userEmailFind = await this.usersRepository.findByEmail(email);
    if (userEmailFind && userEmailFind.id !== user.id) throw new _AppError.default('This email is already used', 401);
    if (password && !oldpassword) throw new _AppError.default('you need to inform the old password', 401);

    if (oldpassword) {
      const isEqual = await this.hashPassword.HashCompare(oldpassword, user.password);
      if (!isEqual) throw new _AppError.default('Password old not valid', 401);
    }

    if (password) user.password = await this.hashPassword.HashCrete(password);
    user.name = name;
    user.email = email;
    await this.usersRepository.save(user);
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateProfileUserServices;
exports.default = _default;