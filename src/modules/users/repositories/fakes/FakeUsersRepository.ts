import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import User from '@modules/users/infra/typeorm/entities/User';

import { uuid } from 'uuidv4';

interface ICreateUsersRequest extends ICreateUsersDTO {
  created_at?: Date;
}

class FakeUsersRepository implements IUsersRepository {
  private Users: User[] = [];

  public async create({
    name,
    email,
    password,
  }: ICreateUsersDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });
    this.Users.push(user);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.Users.find(userFind => userFind.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.Users.find(userfind => userfind.email === email);
    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.Users;
  }

  public async save(users: User): Promise<User | undefined> {
    const userIndex = this.Users.findIndex(user => user.id === users.id);
    if (userIndex) this.Users[userIndex] = users;
    return users;
  }
}

export default FakeUsersRepository;
