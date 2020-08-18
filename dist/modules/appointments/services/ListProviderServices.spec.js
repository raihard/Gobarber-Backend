"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeCache = _interopRequireDefault(require("../../Caches/fakes/FakeCache"));

var _ListProviderServices = _interopRequireDefault(require("./ListProviderServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
let fakeUsersRepository;
let listProviderServices;
let fakeCache;
let userLogged;
let user1;
let user2;
describe('ShowProfileUserServices', () => {
  beforeAll(async () => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCache = new _FakeCache.default();
    listProviderServices = new _ListProviderServices.default(fakeUsersRepository, fakeCache);
    user1 = await fakeUsersRepository.create({
      name: 'Joao',
      email: 'Joao@Fakes.com',
      password: 'Joao1213'
    });
    user2 = await fakeUsersRepository.create({
      name: 'Pedro',
      email: 'Pedro@Fakes.com',
      password: 'Pedro321'
    });
    userLogged = await fakeUsersRepository.create({
      name: 'Radames',
      email: 'Radames@Fakes.com',
      password: 'Radames1213'
    });
  });
  it('should be able to list all providers', async () => {
    const userList = await listProviderServices.execute({
      except_user_id: userLogged.id
    });
    expect(userList).toEqual([user1, user2]);
  });
});