import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequestData {
  except_user_id?: string;
}

@injectable()
class ListProviderServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ except_user_id }: IRequestData): Promise<User[]> {
    let users: User[] = [];
    users = await this.usersRepository.findAll();

    users = users.filter(user => user.id !== except_user_id);

    return users;
  }
}

export default ListProviderServices;
