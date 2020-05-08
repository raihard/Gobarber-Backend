import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async buscaAgendamento(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(item =>
      isEqual(item.date, date),
    );
    return appointment;
  }

  public async create({
    date,
    provider_UserId,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_UserId });
    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
