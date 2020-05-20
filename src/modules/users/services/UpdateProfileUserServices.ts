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
class UpdateProfileUserServices {
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

    if (password && !oldpassword)
      throw new AppError('you need to inform the old password', 401);

    if (oldpassword) {
      const isEqual = await this.hashPassword.HashCompare(
        oldpassword,
        user.password,
      );
      if (!isEqual) throw new AppError('Password old not valid', 401);
    }

    if (password) user.password = await this.hashPassword.HashCrete(password);
    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileUserServices;
