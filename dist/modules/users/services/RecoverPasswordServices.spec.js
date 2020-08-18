"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUserTokenRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokenRepository"));

var _FakeBCryptHashPassword = _interopRequireDefault(require("../providers/HashPassword/implements/fakes/FakeBCryptHashPassword"));

var _RecoverPasswordServices = _interopRequireDefault(require("./RecoverPasswordServices"));

var _FakeMailtrapSend = _interopRequireDefault(require("../../../shared/container/providers/Mail/implements/fakes/FakeMailtrapSend"));

var _FakeCache = _interopRequireDefault(require("../../Caches/fakes/FakeCache"));

var _CreateUsersServices = _interopRequireDefault(require("./CreateUsersServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('RecoverPasswordServices', () => {
  it('should be able to recover a password with email existed', async () => {
    const fakeUsersRepository = new _FakeUsersRepository.default();
    const fakeUserTokenRepository = new _FakeUserTokenRepository.default();
    const fakeBCryptHashPassword = new _FakeBCryptHashPassword.default();
    const fakeMailtrapSend = new _FakeMailtrapSend.default();
    const fakeCache = new _FakeCache.default();
    const createUsersServices = new _CreateUsersServices.default(fakeUsersRepository, fakeBCryptHashPassword, fakeCache);
    const recoverPasswordServices = new _RecoverPasswordServices.default(fakeUsersRepository, fakeMailtrapSend, fakeUserTokenRepository);
    const name = 'Fakes';
    const email = 'Fakes@Fakes.com';
    const password = 'Fakes1213';
    const user = await createUsersServices.execute({
      name,
      email,
      password
    });
    expect(user).toHaveProperty('id');
    const reponse = await recoverPasswordServices.execute({
      email
    });
    expect(reponse).toHaveProperty('token');
    await expect(recoverPasswordServices.execute({
      email: 'a@a.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});