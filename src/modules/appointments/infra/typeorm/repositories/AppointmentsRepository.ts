import { getRepository, Repository, Between } from 'typeorm';

import moment from 'moment';
import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindMonthProviserDTO from '@modules/appointments/dtos/IFindMonthProviserDTO';
import IFindDayProviserDTO from '@modules/appointments/dtos/IFindDayProviserDTO';
import Appointment from '../entities/Appointments';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findAllDayProvider({
    provider_UserId,
    day,
    month,
    year,
  }: IFindDayProviserDTO): Promise<Appointment[]> {
    const dateStart = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    const dateEnd = moment(dateStart).add(1, 'd').add(-1, 'second');

    const appointments = await this.ormRepository.find({
      where: {
        provider_UserId,
        date: Between(dateStart, dateEnd),
      },
      relations: ['user'],
      order: {
        date: 'ASC',
      },
    });

    return appointments;
  }

  public async findAllMonthProvider({
    provider_UserId,
    month,
    year,
  }: IFindMonthProviserDTO): Promise<Appointment[]> {
    const dateStart = moment(`${year}-${month}-01`, 'YYYY-MM-DD');
    const dateEnd = moment(dateStart).add(1, 'month').add(-1, 'second');

    const appointments = await this.ormRepository.find({
      where: {
        provider_UserId,
        date: Between(dateStart, dateEnd),
      },
    });

    return appointments;
  }

  public async findbyDate(
    date: Date,
    provider_UserId: string,
  ): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({
      where: { provider_UserId, date },
    });
    return appointment;
  }

  public async create({
    date,
    user_id,
    provider_UserId,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      date,
      user_id,
      provider_UserId,
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
