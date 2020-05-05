import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Users from '../models/Users';
import AppError from '../errors/AppError';

interface ParmsRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUsersServices {
  public async execute({
    name,
    email,
    password,
  }: ParmsRequest): Promise<Users> {
    const usersRepository = getRepository(Users);

    const existUser = await usersRepository.findOne({ email });

    if (existUser) throw new AppError('Email já cadastrado!');

    const hashPassword = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUsersServices;
