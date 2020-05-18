// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ListProviderServices from './ListProviderServices';

let fakeUsersRepository: FakeUsersRepository;
let listProviderServices: ListProviderServices;

let userLogged: User;
let user1: User;
let user2: User;

describe('ShowProfileUserServices', () => {
  beforeAll(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviderServices = new ListProviderServices(fakeUsersRepository);

    user1 = await fakeUsersRepository.create({
      name: 'Joao',
      email: 'Joao@Fakes.com',
      password: 'Joao1213',
    });

    user2 = await fakeUsersRepository.create({
      name: 'Pedro',
      email: 'Pedro@Fakes.com',
      password: 'Pedro321',
    });

    userLogged = await fakeUsersRepository.create({
      name: 'Radames',
      email: 'Radames@Fakes.com',
      password: 'Radames1213',
    });
  });

  it('should be able to list all providers', async () => {
    const userList = await listProviderServices.execute({
      except_user_id: userLogged.id,
    });

    expect(userList).toEqual([user1, user2]);
  });
});
