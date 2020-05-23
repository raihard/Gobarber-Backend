import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBCryptHashPassword from '@modules/users/providers/HashPassword/implements/fakes/FakeBCryptHashPassword';
import FakeCache from '@modules/Caches/fakes/FakeCache';
import CreateUsersServices from './CreateUsersServices';

describe('CreateUsersServices', () => {
  it('should be able to create a new user and should not be able create with email existed', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHashPassword = new FakeBCryptHashPassword();
    const fakeCache = new FakeCache();
    const createUsersServices = new CreateUsersServices(
      fakeUsersRepository,
      fakeBCryptHashPassword,
      fakeCache,
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
    await expect(
      createUsersServices.execute({
        name,
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
