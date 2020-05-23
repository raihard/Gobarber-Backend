import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import FakeBCryptHashPassword from '@modules/users/providers/HashPassword/implements/fakes/FakeBCryptHashPassword';
import RecoverPasswordServices from '@modules/users/services/RecoverPasswordServices';
import FakeMailtrapSend from '@shared/container/providers/Mail/implements/fakes/FakeMailtrapSend';

import FakeCache from '@modules/Caches/fakes/FakeCache';
import CreateUsersServices from './CreateUsersServices';

describe('RecoverPasswordServices', () => {
  it('should be able to recover a password with email existed', async () => {
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

    const name = 'Fakes';
    const email = 'Fakes@Fakes.com';
    const password = 'Fakes1213';

    const user = await createUsersServices.execute({
      name,
      email,
      password,
    });
    expect(user).toHaveProperty('id');

    const reponse = await recoverPasswordServices.execute({ email });

    expect(reponse).toHaveProperty('token');

    await expect(
      recoverPasswordServices.execute({ email: 'a@a.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
