import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import Users from '@modules/users/infra/typeorm/entities/Users';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<Users>;

  constructor() {
    this.ormRepository = getRepository(Users);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUsersDTO): Promise<Users> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async findById(id: string): Promise<Users | undefined> {
    const User = await this.ormRepository.findOne(id);
    return User;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const User = await this.ormRepository.findOne({ where: { email } });
    return User;
  }

  public async save(users: Users): Promise<Users | undefined> {
    return this.ormRepository.save(users);
  }
}

export default UsersRepository;
