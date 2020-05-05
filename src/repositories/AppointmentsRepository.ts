import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointments';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async buscaAgendamento(date: Date): Promise<Appointment | null> {
    const appointment = await this.findOne({ where: { date } });
    return appointment || null;
  }
}

export default AppointmentsRepository;
