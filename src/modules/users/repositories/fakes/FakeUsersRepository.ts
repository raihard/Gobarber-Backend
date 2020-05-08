import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import Users from '@modules/users/infra/typeorm/entities/Users';

import { uuid } from 'uuidv4';

class UsersRepository implements IUsersRepository {
  private Users: Users[] = [];

  public async create({
    name,
    email,
    password,
  }: ICreateUsersDTO): Promise<Users> {
    const user = new Users();

    Object.assign(user, { id: uuid(), name, email, password });
    // this.save(user);
    this.Users.push(user);
    return user;
  }

  public async findById(id: string): Promise<Users | undefined> {
    const User = await this.Users.find(user => user.id === id);
    return User;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const User = await this.Users.find(user => user.email === email);
    return User;
  }

  public async save(users: Users): Promise<Users | undefined> {
    const userIndex = this.Users.findIndex(user => user.id === users.id);
    if (userIndex) this.Users[userIndex] = users;
    return users;
  }
}

export default UsersRepository;
