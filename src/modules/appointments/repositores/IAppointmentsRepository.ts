import Appointment from '../infra/typeorm/entities/Appointments'; // '../entities/Appointments';

export default interface IAppointmentsRepository {
  buscaAgendamento(date: Date): Promise<Appointment | undefined>;
}
