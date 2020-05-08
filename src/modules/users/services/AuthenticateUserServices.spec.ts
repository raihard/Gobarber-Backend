import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBCryptHashPassword from '@modules/users/providers/HashPassword/implements/fakes/FakeBCryptHashPassword';
import AuthenticateUserServices from './AuthenticateUserServices';
import CreateUsersServices from './CreateUsersServices';

describe('AuthenticateUserServices', () => {
  it('should be able to create a new user and should not be able create with email existed', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHashPassword = new FakeBCryptHashPassword();
    const authenticateUserServices = new AuthenticateUserServices(
      fakeUsersRepository,
      fakeBCryptHashPassword,
    );
    const createUsersServices = new CreateUsersServices(
      fakeUsersRepository,
      fakeBCryptHashPassword,
    );

    const name = 'Fakes';
    const email = 'Fakes@Fakes.com';
    const password = 'Fakes1213';

    const user = await createUsersServices.execute({
      name,
      email,
      password,
    });

    const response = await authenticateUserServices.execute({
      email,
      password,
    });
    expect(response).toHaveProperty('token');

    expect(
      authenticateUserServices.execute({
        email: 'a@a.com',
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(
      authenticateUserServices.execute({
        email,
        password: '0',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
