import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IHashPassword from '@modules/users/providers/HashPassword/IHashPassword';

import User from '../infra/typeorm/entities/User';

interface IParmsRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  oldpassword?: string;
}

@injectable()
class UploadProfileUserServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashPassword')
    private hashPassword: IHashPassword,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    oldpassword,
  }: IParmsRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found', 401);

    const userEmailFind = await this.usersRepository.findByEmail(email);

    if (userEmailFind && userEmailFind.id !== user.id)
      throw new AppError('This email is already used', 401);

    if (password) {
      if (!oldpassword)
        throw new AppError('you need to inform the old password', 401);

      const isMath = await this.hashPassword.HashCompare(
        oldpassword,
        user.password,
      );
      if (!isMath) throw new AppError('Password old not valid', 401);

      user.password = await this.hashPassword.HashCrete(password);
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UploadProfileUserServices;
