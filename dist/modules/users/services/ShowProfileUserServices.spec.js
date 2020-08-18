"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ShowProfileUserServices = _interopRequireDefault(require("./ShowProfileUserServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let showProfileUserServices;
let user;
const name = 'Fakes';
const email = 'Fakes@Fakes.com';
const password = 'Fakes1213';
describe('ShowProfileUserServices', () => {
  beforeAll(async () => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    showProfileUserServices = new _ShowProfileUserServices.default(fakeUsersRepository);
    user = await fakeUsersRepository.create({
      name,
      email,
      password
    });
  });
  it('should be able to show pro file a user created', async () => {
    const userUpdated = await showProfileUserServices.execute(user.id);
    expect(userUpdated.name).toBe(name);
    expect(userUpdated.email).toBe(email);
    expect(userUpdated.password).toBe(password);
  });
  it('should not be able to show pro file a user not created', async () => {
    await expect(showProfileUserServices.execute('123')).rejects.toBeInstanceOf(_AppError.default);
  });
});