import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindMonthProviserDTO from '@modules/appointments/dtos/IFindMonthProviserDTO';
import IFindDayProviserDTO from '@modules/appointments/dtos/IFindDayProviserDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';

import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import moment from 'moment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findAllMonthProvider({
    provider_UserId,
    month,
    year,
  }: IFindMonthProviserDTO): Promise<Appointment[]> {
    const datefind = moment(`${year}-${month}-01`, 'YYYY-MM-DD');
    const listAppointment = this.appointments.filter(appointment => {
      return (
        appointment.provider_UserId === provider_UserId &&
        isEqual(appointment.date.getFullYear(), datefind.year()) &&
        isEqual(appointment.date.getMonth(), datefind.month())
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
    const datefind = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');

    const listAppointment = this.appointments.filter(appointment => {
      return (
        appointment.provider_UserId === provider_UserId &&
        isEqual(appointment.date.getFullYear(), datefind.year()) &&
        isEqual(appointment.date.getMonth(), datefind.month()) &&
        isEqual(appointment.date.getDate(), datefind.date())
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
    user_id,
    provider_UserId,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_UserId, user_id });
    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
