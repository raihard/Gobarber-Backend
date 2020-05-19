import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindMonthProviserDTO from '@modules/appointments/dtos/IFindMonthProviserDTO';
import IFindDayProviserDTO from '@modules/appointments/dtos/IFindDayProviserDTO';

import Appointment from '../infra/typeorm/entities/Appointments'; // '../entities/Appointments';

export default interface IAppointmentsRepository {
  create(date: ICreateAppointmentsDTO): Promise<Appointment>;
  findbyDate(date: Date): Promise<Appointment | undefined>;
  findAllMonthProvider(data: IFindMonthProviserDTO): Promise<Appointment[]>;
  findAllDayProvider(data: IFindDayProviserDTO): Promise<Appointment[]>;
}
