import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import ISendMail from '@shared/container/providers/Mail/ISendMail';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

interface IRequest {
  email: string;
}

type IReponse = UserToken;

@injectable()
class RecoverPasswordServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('SendMail')
    private SendMail: ISendMail,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<IReponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Email not exist', 401);

    const userToken = this.userTokenRepository.create(user.id);

    await this.SendMail.SendEmail({
      to: email,
      body: 'Voçe esta recebendo um email de confirmação',
    });
    return userToken;
  }
}

export default RecoverPasswordServices;
