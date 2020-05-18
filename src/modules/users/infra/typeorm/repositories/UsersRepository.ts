import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUsersDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.ormRepository.find();
  }

  public async save(users: User): Promise<User | undefined> {
    return this.ormRepository.save(users);
  }
}

export default UsersRepository;
