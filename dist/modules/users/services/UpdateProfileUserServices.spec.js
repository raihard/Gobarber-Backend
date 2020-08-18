"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeBCryptHashPassword = _interopRequireDefault(require("../providers/HashPassword/implements/fakes/FakeBCryptHashPassword"));

var _UpdateProfileUserServices = _interopRequireDefault(require("./UpdateProfileUserServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeBCryptHashPassword;
let uploadProfileUserServices;
let user;
const name = 'Fakes';
const email = 'Fakes@Fakes.com';
let password;
describe('UploadProfileUserServices', () => {
  beforeAll(async () => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeBCryptHashPassword = new _FakeBCryptHashPassword.default();
    password = await fakeBCryptHashPassword.HashCrete('Fakes1213');
    uploadProfileUserServices = new _UpdateProfileUserServices.default(fakeUsersRepository, fakeBCryptHashPassword);
    await fakeUsersRepository.create({
      name: 'Outro Fulano',
      email: 'Fulano@Fakes.com',
      password: await fakeBCryptHashPassword.HashCrete('Outro1213')
    });
    user = await fakeUsersRepository.create({
      name,
      email,
      password
    });
  });
  it('should not be able to update a user not exist', async () => {
    await expect(uploadProfileUserServices.execute({
      user_id: '123',
      name,
      email
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update a user with email existed', async () => {
    await expect(uploadProfileUserServices.execute({
      user_id: user.id,
      name,
      email: 'Fulano@Fakes.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update password if the password old not is equal', async () => {
    await expect(uploadProfileUserServices.execute({
      user_id: user.id,
      name,
      email,
      password: 'newPass',
      oldpassword: 'pass-erro'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update password if the password old empty', async () => {
    await expect(uploadProfileUserServices.execute({
      user_id: user.id,
      name,
      email,
      password: 'Fulano123' // oldpassword: '',

    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update a user created', async () => {
    const userUpdated = await uploadProfileUserServices.execute({
      user_id: user.id,
      name: 'Fulano de Tau',
      email: 'FulanoTau@Fakes.com',
      password: 'Fulano@123',
      oldpassword: user.password
    });
    expect(userUpdated.name).toBe('Fulano de Tau');
    expect(userUpdated.email).toBe('FulanoTau@Fakes.com');
    expect(userUpdated.password).toBe('Fulano@123');
  });
});