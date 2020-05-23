import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBCryptHashPassword from '@modules/users/providers/HashPassword/implements/fakes/FakeBCryptHashPassword';
import FakeCache from '@modules/Caches/fakes/FakeCache';
import AuthenticateUserServices from './AuthenticateUserServices';
import CreateUsersServices from './CreateUsersServices';

describe('AuthenticateUserServices', () => {
  it('should be able to create a new user and should not be able create with email existed', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHashPassword = new FakeBCryptHashPassword();
    delete process.env.JWT_KEY;
    process.env.JWT_KEY = 'Test';

    const fakeCache = new FakeCache();
    const authenticateUserServices = new AuthenticateUserServices(
      fakeUsersRepository,
      fakeBCryptHashPassword,
    );

    const name = 'Fakes';
    const email = 'Fakes@Fakes.com';
    const password = 'Fakes1213';

    await fakeUsersRepository.create({
      name,
      email,
      password,
    });

    const response = await authenticateUserServices.execute({
      email,
      password,
    });
    expect(response).toHaveProperty('token');

    await expect(
      authenticateUserServices.execute({
        email: 'a@a.com',
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      authenticateUserServices.execute({
        email,
        password: '0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
