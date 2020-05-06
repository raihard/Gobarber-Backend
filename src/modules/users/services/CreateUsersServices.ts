import { hash } from 'bcryptjs';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import Users from '../infra/typeorm/entities/Users';

class CreateUsersServices {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUsersDTO): Promise<Users> {
    const existUser = await this.usersRepository.findByEmail(email);

    if (existUser) throw new AppError('Email já cadastrado!');

    const hashPassword = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export default CreateUsersServices;
