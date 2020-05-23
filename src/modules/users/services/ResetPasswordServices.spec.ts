import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import FakeBCryptHashPassword from '@modules/users/providers/HashPassword/implements/fakes/FakeBCryptHashPassword';
import FakeMailtrapSend from '@shared/container/providers/Mail/implements/fakes/FakeMailtrapSend';
import AppError from '@shared/errors/AppError';

import CreateUsersServices from '@modules/users/services/CreateUsersServices';
import RecoverPasswordServices from '@modules/users/services/RecoverPasswordServices';
import ResetPasswordServices from '@modules/users/services/ResetPasswordServices';
import FakeCache from '@modules/Caches/fakes/FakeCache';

describe('ResetPasswordServices', () => {
  it('should be able to reset password in a link valid', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeUserTokenRepository = new FakeUserTokenRepository();
    const fakeBCryptHashPassword = new FakeBCryptHashPassword();
    const fakeMailtrapSend = new FakeMailtrapSend();
    const fakeCache = new FakeCache();

    const createUsersServices = new CreateUsersServices(
      fakeUsersRepository,
      fakeBCryptHashPassword,
      fakeCache,
    );

    const recoverPasswordServices = new RecoverPasswordServices(
      fakeUsersRepository,
      fakeMailtrapSend,
      fakeUserTokenRepository,
    );

    const resetPasswordServices = new ResetPasswordServices(
      fakeUsersRepository,
      fakeBCryptHashPassword,
      fakeUserTokenRepository,
    );

    const name = 'Fakes';
    const email = 'Fakes@Fakes.com';
    const password = await fakeBCryptHashPassword.HashCrete('Fakes1213');

    await createUsersServices.execute({
      name,
      email,
      password,
    });

    const userToken = await recoverPasswordServices.execute({ email });

    const NewPassword = await fakeBCryptHashPassword.HashCrete('1213Fakes');

    const userNewPassword = await resetPasswordServices.execute({
      token: userToken.token,
      password: NewPassword,
    });

    // Test with Reset Password
    expect(userNewPassword?.password).toBe(NewPassword);

    // Test with link expired
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const newDate = new Date();
      return newDate.setHours(newDate.getHours() + 4);
    });
    const newUserToken = await recoverPasswordServices.execute({ email });
    await expect(
      resetPasswordServices.execute({
        token: newUserToken.token,
        password: NewPassword,
      }),
    ).rejects.toBeInstanceOf(AppError);

    // Test with token not expired
    await expect(
      resetPasswordServices.execute({
        token: '65654',
        password: NewPassword,
      }),
    ).rejects.toBeInstanceOf(AppError);

    // Test with user not found
    jest
      .spyOn(fakeUsersRepository, 'findById')
      .mockImplementationOnce(async () => undefined);
    await expect(
      resetPasswordServices.execute({
        token: newUserToken.token,
        password: NewPassword,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
