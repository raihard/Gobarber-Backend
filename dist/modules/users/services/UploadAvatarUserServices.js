"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IStorageFile = _interopRequireDefault(require("../../../shared/container/providers/StorageFile/IStorageFile"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICaches = _interopRequireDefault(require("../../Caches/models/ICaches"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UploadAvatarUserServices = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageFile')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('Caches')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IStorageFile.default === "undefined" ? Object : _IStorageFile.default, typeof _ICaches.default === "undefined" ? Object : _ICaches.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class UploadAvatarUserServices {
  constructor(usersRepository, storageFile, caches) {
    this.usersRepository = usersRepository;
    this.storageFile = storageFile;
    this.caches = caches;
  }

  async execute({
    user_id,
    avatar_filename
  }) {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new _AppError.default('User not found', 401);

    if (user.avatar) {
      await this.storageFile.RemoveFile(user.avatar);
    }

    const userAvatar = await this.storageFile.SaveFile(avatar_filename);
    user.avatar = userAvatar;
    await this.usersRepository.save(user);
    await this.caches.invalidatePrefix(`provider-list`);
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = UploadAvatarUserServices;
exports.default = _default;