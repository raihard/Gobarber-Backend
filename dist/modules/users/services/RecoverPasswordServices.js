"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IUserTokenRepository = _interopRequireDefault(require("../repositories/IUserTokenRepository"));

var _ISendMail = _interopRequireDefault(require("../../../shared/container/providers/Mail/ISendMail"));

var _path = _interopRequireDefault(require("path"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let RecoverPasswordServices = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('SendMail')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokenRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _ISendMail.default === "undefined" ? Object : _ISendMail.default, typeof _IUserTokenRepository.default === "undefined" ? Object : _IUserTokenRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class RecoverPasswordServices {
  constructor(usersRepository, SendMail, userTokenRepository) {
    this.usersRepository = usersRepository;
    this.SendMail = SendMail;
    this.userTokenRepository = userTokenRepository;
  }

  async execute({
    email
  }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new _AppError.default('Email not exist', 401);
    const userToken = await this.userTokenRepository.create(user.id);

    const templateForgotPasswor = _path.default.resolve(__dirname, '..', 'template/forgot _password.hbs');

    await this.SendMail.SendEmail({
      to: {
        name: user.name,
        email: user.email
      },
      from: {
        name: 'Equipe GoBaber',
        email: 'Equipe@GoBarber.com'
      },
      subject: 'Recuperação de senha',
      templateData: {
        templateFile: templateForgotPasswor,
        varibles: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/ResetPassword?token=${userToken.token}`
        }
      }
    });
    return userToken;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = RecoverPasswordServices;
exports.default = _default;