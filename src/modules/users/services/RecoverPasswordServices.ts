import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ISendMail from '@shared/container/providers/Mail/ISendMail';

interface IRequest {
  email: string;
}

interface IReponse {
  ok: boolean;
}

@injectable()
class RecoverPasswordServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('SendMail')
    private SendMail: ISendMail,
  ) {}

  public async execute({ email }: IRequest): Promise<IReponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Email not exist', 401);

    return { ok: true };
  }
}

export default RecoverPasswordServices;
