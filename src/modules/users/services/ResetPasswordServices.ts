import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import IHashPassword from '@modules/users/providers/HashPassword/IHashPassword';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  token: string;
  password: string;
}

type IReponse = UserToken;

@injectable()
class RecoverPasswordServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashPassword')
    private hashPassword: IHashPassword,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({
    token,
    password,
  }: IRequest): Promise<User | undefined> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) throw new AppError('Link expired or not exist', 401);

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) throw new AppError('Email not exist', 401);

    const now = new Date(Date.now());
    const diif = differenceInHours(userToken.created_at, now);

    if (diif > 2) throw new AppError('Link expired or not exist', 401);

    user.password = await this.hashPassword.HashCrete(password);
    this.usersRepository.save(user);

    return user;
  }
}

export default RecoverPasswordServices;
