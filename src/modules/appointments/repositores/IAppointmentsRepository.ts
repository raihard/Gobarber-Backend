import Appointment from '../infra/typeorm/entities/Appointments'; // '../entities/Appointments';
import ICreateAppointmentsDTO from '../dtos/ICreateAppointmentsDTO';

export default interface IAppointmentsRepository {
  create(date: ICreateAppointmentsDTO): Promise<Appointment>;
  buscaAgendamento(date: Date): Promise<Appointment | undefined>;
}
