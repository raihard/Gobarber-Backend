import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBCryptHashPassword from '@modules/users/providers/HashPassword/implements/fakes/FakeBCryptHashPassword';
import RecoverPasswordServices from '@modules/users/services/RecoverPasswordServices';
import FakeMailtrapSend from '@shared/container/providers/Mail/implements/fakes/FakeMailtrapSend';

import CreateUsersServices from './CreateUsersServices';

describe('RecoverPasswordServices', () => {
  it('should be able to update avatar in an user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHashPassword = new FakeBCryptHashPassword();
    const fakeMailtrapSend = new FakeMailtrapSend();

    const createUsersServices = new CreateUsersServices(
      fakeUsersRepository,
      fakeBCryptHashPassword,
    );

    const recoverPasswordServices = new RecoverPasswordServices(
      fakeUsersRepository,
      fakeMailtrapSend,
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
    expect(reponse).toHaveProperty('ok');

    expect(
      recoverPasswordServices.execute({ email: 'a@a.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
