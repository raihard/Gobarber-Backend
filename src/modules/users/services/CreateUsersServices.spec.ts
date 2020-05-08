import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBCryptHashPassword from '@modules/users/providers/HashPassword/implements/fakes/FakeBCryptHashPassword';
import CreateUsersServices from './CreateUsersServices';

describe('CreateUsersServices', () => {
  it('should be able to create a new user and should not be able create with email existed', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHashPassword = new FakeBCryptHashPassword();
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
    expect(user).toHaveProperty('id');
    expect(
      createUsersServices.execute({
        name,
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
