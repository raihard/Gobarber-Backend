import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IAppointmentsRepository {
  create(user_id: string): Promise<UserToken>;
  findByToken(id: string): Promise<UserToken | undefined>;
}
