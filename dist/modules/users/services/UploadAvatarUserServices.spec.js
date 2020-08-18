"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeDiskStorage = _interopRequireDefault(require("../../../shared/container/providers/StorageFile/implements/fakes/FakeDiskStorage"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeBCryptHashPassword = _interopRequireDefault(require("../providers/HashPassword/implements/fakes/FakeBCryptHashPassword"));

var _FakeCache = _interopRequireDefault(require("../../Caches/fakes/FakeCache"));

var _UploadAvatarUserServices = _interopRequireDefault(require("./UploadAvatarUserServices"));

var _CreateUsersServices = _interopRequireDefault(require("./CreateUsersServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('AuthenticateUserServices', () => {
  it('should be able to update avatar in an user', async () => {
    const fakeDiskStorage = new _FakeDiskStorage.default();
    const fakeUsersRepository = new _FakeUsersRepository.default();
    const fakeBCryptHashPassword = new _FakeBCryptHashPassword.default();
    const fakeCache = new _FakeCache.default();
    const createUsersServices = new _CreateUsersServices.default(fakeUsersRepository, fakeBCryptHashPassword, fakeCache);
    const uploadAvatarUserServices = new _UploadAvatarUserServices.default(fakeUsersRepository, fakeDiskStorage);
    const name = 'Fakes';
    const email = 'Fakes@Fakes.com';
    const password = 'Fakes1213';
    const user = await createUsersServices.execute({
      name,
      email,
      password
    });
    expect(user).toHaveProperty('id');
    const {
      id: user_id
    } = user;
    const avatar_filename = 'Fakesfile';
    await uploadAvatarUserServices.execute({
      avatar_filename,
      user_id
    });
    const response = await uploadAvatarUserServices.execute({
      avatar_filename,
      user_id
    });
    expect(response).toHaveProperty('avatar');
    await expect(uploadAvatarUserServices.execute({
      avatar_filename,
      user_id: '321'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});