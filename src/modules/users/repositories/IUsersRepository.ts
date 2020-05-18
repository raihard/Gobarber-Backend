import User from '../infra/typeorm/entities/User';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
  findAll(): Promise<User[]>;
  create(date: ICreateUsersDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User | undefined>;
}
