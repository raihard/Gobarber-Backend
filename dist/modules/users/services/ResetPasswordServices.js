"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IUserTokenRepository = _interopRequireDefault(require("../repositories/IUserTokenRepository"));

var _IHashPassword = _interopRequireDefault(require("../providers/HashPassword/IHashPassword"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let RecoverPasswordServices = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashPassword')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokenRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IHashPassword.default === "undefined" ? Object : _IHashPassword.default, typeof _IUserTokenRepository.default === "undefined" ? Object : _IUserTokenRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class RecoverPasswordServices {
  constructor(usersRepository, hashPassword, userTokenRepository) {
    this.usersRepository = usersRepository;
    this.hashPassword = hashPassword;
    this.userTokenRepository = userTokenRepository;
  }

  async execute({
    token,
    password
  }) {
    const userToken = await this.userTokenRepository.findByToken(token);
    if (!userToken) throw new _AppError.default('Link expired or not exist', 401);
    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) throw new _AppError.default('Email not exist', 401);
    const now = new Date(Date.now());
    const diif = (0, _dateFns.differenceInHours)(userToken.created_at, now);
    if (diif > 2) throw new _AppError.default('Link expired or not exist', 401);
    user.password = await this.hashPassword.HashCrete(password);
    this.usersRepository.save(user);
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = RecoverPasswordServices;
exports.default = _default;