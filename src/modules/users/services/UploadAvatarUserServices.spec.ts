import AppError from '@shared/errors/AppError';
import FakeDiskStorage from '@shared/container/providers/StorageFile/implements/fakes/FakeDiskStorage';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBCryptHashPassword from '@modules/users/providers/HashPassword/implements/fakes/FakeBCryptHashPassword';
import UploadAvatarUserServices from '@modules/users/services/UploadAvatarUserServices';
import CreateUsersServices from './CreateUsersServices';

describe('AuthenticateUserServices', () => {
  it('should be able to update avatar in an user', async () => {
    const fakeDiskStorage = new FakeDiskStorage();
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHashPassword = new FakeBCryptHashPassword();

    const createUsersServices = new CreateUsersServices(
      fakeUsersRepository,
      fakeBCryptHashPassword,
    );

    const uploadAvatarUserServices = new UploadAvatarUserServices(
      fakeUsersRepository,
      fakeDiskStorage,
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

    const { id: user_id } = user;
    const avatar_filename = 'Fakesfile';

    await uploadAvatarUserServices.execute({
      avatar_filename,
      user_id,
    });

    const response = await uploadAvatarUserServices.execute({
      avatar_filename,
      user_id,
    });

    expect(response).toHaveProperty('avatar');
    expect(
      uploadAvatarUserServices.execute({
        avatar_filename,
        user_id: '321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
