import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageFile from '@shared/container/providers/StorageFile/IStorageFile';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface IParmsRequest {
  user_id: string;
  avatar_filename: string;
}

@injectable()
class UploadAvatarUserServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageFile')
    private storageFile: IStorageFile,
  ) {}

  public async execute({
    user_id,
    avatar_filename,
  }: IParmsRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found', 401);

    if (user.avatar) {
      await this.storageFile.RemoveFile(user.avatar);
    }
    const userAvatar = await this.storageFile.SaveFile(avatar_filename);

    user.avatar = userAvatar;

    await this.usersRepository.save(user);
    return user;
  }
}

export default UploadAvatarUserServices;
