import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import UploadConfig from '../config/upload';
import User from '../models/Users';
import AppError from '../errors/AppError';

interface ParmsRequest {
  user_id: string;
  avatar_filename: string;
}

class UploadAvatarUserServices {
  public async execute({
    user_id,
    avatar_filename,
  }: ParmsRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ id: user_id });

    if (!user) throw new AppError('User not found', 401);

    if (user.avatar) {
      const userAvatar = path.join(UploadConfig.pathUploads, user.avatar);
      const userAvatarExist = await fs.promises.stat(userAvatar);
      if (userAvatarExist) await fs.promises.unlink(userAvatar);
    }

    user.avatar = avatar_filename;

    await usersRepository.save(user);
    return user;
  }
}

export default UploadAvatarUserServices;
