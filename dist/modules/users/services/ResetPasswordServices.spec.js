"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUserTokenRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokenRepository"));

var _FakeBCryptHashPassword = _interopRequireDefault(require("../providers/HashPassword/implements/fakes/FakeBCryptHashPassword"));

var _FakeMailtrapSend = _interopRequireDefault(require("../../../shared/container/providers/Mail/implements/fakes/FakeMailtrapSend"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _CreateUsersServices = _interopRequireDefault(require("./CreateUsersServices"));

var _RecoverPasswordServices = _interopRequireDefault(require("./RecoverPasswordServices"));

var _ResetPasswordServices = _interopRequireDefault(require("./ResetPasswordServices"));

var _FakeCache = _interopRequireDefault(require("../../Caches/fakes/FakeCache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ResetPasswordServices', () => {
  it('should be able to reset password in a link valid', async () => {
    const fakeUsersRepository = new _FakeUsersRepository.default();
    const fakeUserTokenRepository = new _FakeUserTokenRepository.default();
    const fakeBCryptHashPassword = new _FakeBCryptHashPassword.default();
    const fakeMailtrapSend = new _FakeMailtrapSend.default();
    const fakeCache = new _FakeCache.default();
    const createUsersServices = new _CreateUsersServices.default(fakeUsersRepository, fakeBCryptHashPassword, fakeCache);
    const recoverPasswordServices = new _RecoverPasswordServices.default(fakeUsersRepository, fakeMailtrapSend, fakeUserTokenRepository);
    const resetPasswordServices = new _ResetPasswordServices.default(fakeUsersRepository, fakeBCryptHashPassword, fakeUserTokenRepository);
    const name = 'Fakes';
    const email = 'Fakes@Fakes.com';
    const password = await fakeBCryptHashPassword.HashCrete('Fakes1213');
    await createUsersServices.execute({
      name,
      email,
      password
    });
    const userToken = await recoverPasswordServices.execute({
      email
    });
    const NewPassword = await fakeBCryptHashPassword.HashCrete('1213Fakes');
    const userNewPassword = await resetPasswordServices.execute({
      token: userToken.token,
      password: NewPassword
    }); // Test with Reset Password

    expect(userNewPassword === null || userNewPassword === void 0 ? void 0 : userNewPassword.password).toBe(NewPassword); // Test with link expired

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const newDate = new Date();
      return newDate.setHours(newDate.getHours() + 4);
    });
    const newUserToken = await recoverPasswordServices.execute({
      email
    });
    await expect(resetPasswordServices.execute({
      token: newUserToken.token,
      password: NewPassword
    })).rejects.toBeInstanceOf(_AppError.default); // Test with token not expired

    await expect(resetPasswordServices.execute({
      token: '65654',
      password: NewPassword
    })).rejects.toBeInstanceOf(_AppError.default); // Test with user not found

    jest.spyOn(fakeUsersRepository, 'findById').mockImplementationOnce(async () => undefined);
    await expect(resetPasswordServices.execute({
      token: newUserToken.token,
      password: NewPassword
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});