import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBCryptHashPassword from '@modules/users/providers/HashPassword/implements/fakes/FakeBCryptHashPassword';

import User from '@modules/users/infra/typeorm/entities/User';

import UploadProfileUserServices from './UploadProfileUserServices';

let fakeUsersRepository: FakeUsersRepository;
let fakeBCryptHashPassword: FakeBCryptHashPassword;
let uploadProfileUserServices: UploadProfileUserServices;
let user: User;

const name = 'Fakes';
const email = 'Fakes@Fakes.com';
const password = 'Fakes1213';

describe('UploadProfileUserServices', () => {
  beforeAll(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBCryptHashPassword = new FakeBCryptHashPassword();

    uploadProfileUserServices = new UploadProfileUserServices(
      fakeUsersRepository,
      fakeBCryptHashPassword,
    );

    await fakeUsersRepository.create({
      name: 'Outro Fulano',
      email: 'Fulano@Fakes.com',
      password: 'Outro1213',
    });

    user = await fakeUsersRepository.create({
      name,
      email,
      password,
    });
  });

  it('should not be able to update a user not exist', async () => {
    await expect(
      uploadProfileUserServices.execute({
        user_id: '123',
        name,
        email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user with email existed', async () => {
    await expect(
      uploadProfileUserServices.execute({
        user_id: user.id,
        name,
        email: 'Fulano@Fakes.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password if the old password not informed', async () => {
    await expect(
      uploadProfileUserServices.execute({
        user_id: user.id,
        name,
        email,
        password: 'Fulano123',
        oldpassword: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password if the password old not is equal', async () => {
    await expect(
      uploadProfileUserServices.execute({
        user_id: user.id,
        name,
        email,
        password: 'Fulano123',
        oldpassword: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a user created', async () => {
    const userUpdated = await uploadProfileUserServices.execute({
      user_id: user.id,
      name: 'Fulano de Tau',
      email: 'FulanoTau@Fakes.com',
      password: 'Fulano@123',
      oldpassword: user.password,
    });

    expect(userUpdated.name).toBe('Fulano de Tau');
    expect(userUpdated.email).toBe('FulanoTau@Fakes.com');
    expect(userUpdated.password).toBe('Fulano@123');
  });
});
