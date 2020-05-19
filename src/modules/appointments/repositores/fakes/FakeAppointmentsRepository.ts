import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindMonthProviserDTO from '@modules/appointments/dtos/IFindMonthProviserDTO';
import IFindDayProviserDTO from '@modules/appointments/dtos/IFindDayProviserDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findAllMonthProvider({
    provider_UserId,
    month,
    year,
  }: IFindMonthProviserDTO): Promise<Appointment[]> {
    const listAppointment = this.appointments.filter(appointment => {
      return (
        appointment.provider_UserId === provider_UserId &&
        isEqual(appointment.date.getFullYear(), year) &&
        isEqual(appointment.date.getMonth(), month)
      );
    });

    return listAppointment;
  }

  public async findAllDayProvider({
    provider_UserId,
    day,
    month,
    year,
  }: IFindDayProviserDTO): Promise<Appointment[]> {
    const listAppointment = this.appointments.filter(appointment => {
      return (
        appointment.provider_UserId === provider_UserId &&
        isEqual(appointment.date.getFullYear(), year) &&
        isEqual(appointment.date.getMonth(), month) &&
        isEqual(appointment.date.getDate(), day)
      );
    });

    return listAppointment;
  }

  public async findbyDate(date: Date): Promise<Appointment | undefined> {
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
