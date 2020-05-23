import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IHashPassword from '@modules/users/providers/HashPassword/IHashPassword';
import ICaches from '@modules/Caches/models/ICaches';

@injectable()
class CreateUsersServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashPassword')
    private hashPassword: IHashPassword,

    @inject('Caches')
    private caches: ICaches,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUsersDTO): Promise<User> {
    const existUser = await this.usersRepository.findByEmail(email);

    if (existUser) throw new AppError('Email já cadastrado!');

    const hashPassword = await this.hashPassword.HashCrete(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });
    await this.caches.invalidatePrefix(`provider-list`);
    return user;
  }
}

export default CreateUsersServices;
