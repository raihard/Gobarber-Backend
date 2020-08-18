"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _ICaches = _interopRequireDefault(require("../../Caches/models/ICaches"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProviderServices = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Caches')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _ICaches.default === "undefined" ? Object : _ICaches.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListProviderServices {
  constructor(usersRepository, caches) {
    this.usersRepository = usersRepository;
    this.caches = caches;
  }

  async execute({
    except_user_id
  }) {
    let users = await this.caches.recover(`provider-list:${except_user_id}`);

    if (!users) {
      users = await this.usersRepository.findAll();
      users = users.filter(user => user.id !== except_user_id);
      users = (0, _classTransformer.classToClass)(users);
      await this.caches.save(`provider-list:${except_user_id}`, users);
    }

    return users;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = ListProviderServices;
exports.default = _default;