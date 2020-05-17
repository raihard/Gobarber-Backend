import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

import ShowProfileUserServices from './ShowProfileUserServices';

let fakeUsersRepository: FakeUsersRepository;

let showProfileUserServices: ShowProfileUserServices;
let user: User;

const name = 'Fakes';
const email = 'Fakes@Fakes.com';
const password = 'Fakes1213';

describe('ShowProfileUserServices', () => {
  beforeAll(async () => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileUserServices = new ShowProfileUserServices(fakeUsersRepository);

    user = await fakeUsersRepository.create({
      name,
      email,
      password,
    });
  });

  it('should be able to show pro file a user created', async () => {
    const userUpdated = await showProfileUserServices.execute(user.id);

    expect(userUpdated.name).toBe(name);
    expect(userUpdated.email).toBe(email);
    expect(userUpdated.password).toBe(password);
  });

  it('should not be able to show pro file a user not created', async () => {
    await expect(showProfileUserServices.execute('123')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
