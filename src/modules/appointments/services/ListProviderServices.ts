import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import ICaches from '@modules/Caches/models/ICaches';

interface IRequestData {
  except_user_id?: string;
}

@injectable()
class ListProviderServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('Caches')
    private caches: ICaches,
  ) {}

  public async execute({ except_user_id }: IRequestData): Promise<User[]> {
    let users = await this.caches.recover<User[]>(
      `provider-list:${except_user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAll();
      users = users.filter(user => user.id !== except_user_id);
      users = classToClass(users);
      await this.caches.save(`provider-list:${except_user_id}`, users);
    }

    return users;
  }
}

export default ListProviderServices;
