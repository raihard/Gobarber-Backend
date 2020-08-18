"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeBCryptHashPassword = _interopRequireDefault(require("../providers/HashPassword/implements/fakes/FakeBCryptHashPassword"));

var _FakeCache = _interopRequireDefault(require("../../Caches/fakes/FakeCache"));

var _CreateUsersServices = _interopRequireDefault(require("./CreateUsersServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('CreateUsersServices', () => {
  it('should be able to create a new user and should not be able create with email existed', async () => {
    const fakeUsersRepository = new _FakeUsersRepository.default();
    const fakeBCryptHashPassword = new _FakeBCryptHashPassword.default();
    const fakeCache = new _FakeCache.default();
    const createUsersServices = new _CreateUsersServices.default(fakeUsersRepository, fakeBCryptHashPassword, fakeCache);
    const name = 'Fakes';
    const email = 'Fakes@Fakes.com';
    const password = 'Fakes1213';
    const user = await createUsersServices.execute({
      name,
      email,
      password
    });
    expect(user).toHaveProperty('id');
    await expect(createUsersServices.execute({
      name,
      email,
      password
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});