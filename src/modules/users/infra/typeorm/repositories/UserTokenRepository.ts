import { getRepository, Repository } from 'typeorm';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class UsersRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async create(User_Id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      User_Id,
    });
    await this.ormRepository.save(userToken);
    return userToken;
  }

  public async findByUserId(id: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { User_Id: id },
    });
    return userToken;
  }
}

export default UsersRepository;
