import Users from '../infra/typeorm/entities/Users';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

export default interface IAppointmentsRepository {
  create(date: ICreateUsersDTO): Promise<Users>;
  findById(id: string): Promise<Users | undefined>;
  findByEmail(email: string): Promise<Users | undefined>;
  save(users: Users): Promise<Users | undefined>;
}
