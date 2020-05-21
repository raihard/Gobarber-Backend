import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import ISendMail from '@shared/container/providers/Mail/ISendMail';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import path from 'path';

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

    const userToken = await this.userTokenRepository.create(user.id);
    const templateForgotPasswor = path.resolve(
      __dirname,
      '..',
      'template/forgot _password.hbs',
    );

    await this.SendMail.SendEmail({
      to: { name: user.name, email: user.email },
      from: { name: 'Equipe GoBaber', email: 'Equipe@GoBarber.com' },
      subject: 'Recuperação de senha',
      templateData: {
        templateFile: templateForgotPasswor,
        varibles: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/ResetPassword?token=${userToken.token}`,
        },
      },
    });
    return userToken;
  }
}

export default RecoverPasswordServices;
