import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import UploadConfig from '@config/upload';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import Users from '../infra/typeorm/entities/Users';

interface IParmsRequest {
  user_id: string;
  avatar_filename: string;
}

@injectable()
class UploadAvatarUserServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    avatar_filename,
  }: IParmsRequest): Promise<Users> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found', 401);

    if (user.avatar) {
      const userAvatar = path.join(UploadConfig.pathUploads, user.avatar);
      const userAvatarExist = await fs.promises.stat(userAvatar);
      if (userAvatarExist) await fs.promises.unlink(userAvatar);
    }

    user.avatar = avatar_filename;

    await this.usersRepository.save(user);
    return user;
  }
}

export default UploadAvatarUserServices;
