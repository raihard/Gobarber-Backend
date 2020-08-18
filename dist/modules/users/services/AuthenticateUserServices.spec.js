"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeBCryptHashPassword = _interopRequireDefault(require("../providers/HashPassword/implements/fakes/FakeBCryptHashPassword"));

var _FakeCache = _interopRequireDefault(require("../../Caches/fakes/FakeCache"));

var _AuthenticateUserServices = _interopRequireDefault(require("./AuthenticateUserServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('AuthenticateUserServices', () => {
  it('should be able to create a new user and should not be able create with email existed', async () => {
    const fakeUsersRepository = new _FakeUsersRepository.default();
    const fakeBCryptHashPassword = new _FakeBCryptHashPassword.default();
    delete process.env.JWT_KEY;
    process.env.JWT_KEY = 'Test';
    const fakeCache = new _FakeCache.default();
    const authenticateUserServices = new _AuthenticateUserServices.default(fakeUsersRepository, fakeBCryptHashPassword);
    const name = 'Fakes';
    const email = 'Fakes@Fakes.com';
    const password = 'Fakes1213';
    await fakeUsersRepository.create({
      name,
      email,
      password
    });
    const response = await authenticateUserServices.execute({
      email,
      password
    });
    expect(response).toHaveProperty('token');
    await expect(authenticateUserServices.execute({
      email: 'a@a.com',
      password
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(authenticateUserServices.execute({
      email,
      password: '0'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});