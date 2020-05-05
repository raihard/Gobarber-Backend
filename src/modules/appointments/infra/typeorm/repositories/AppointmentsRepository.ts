import { EntityRepository, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
import Appointment from '../entities/Appointments';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepository {
  public async buscaAgendamento(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.findOne({ where: { date } });
    return appointment;
  }
}

export default AppointmentsRepository;
