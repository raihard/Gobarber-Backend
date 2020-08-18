import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
import ICaches from '@modules/Caches/models/ICaches';
import moment from 'moment';
import { classToClass } from 'class-transformer';
import Appointment from '../infra/typeorm/entities/Appointments';

interface IParmsRequest {
  provider_UserId: string;
  day: number;
  month: number;
  year: number;
}
@injectable()
class ListAppointmentsServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('Caches')
    private caches: ICaches,
  ) {}

  public async execute({
    provider_UserId,
    day,
    month,
    year,
  }: IParmsRequest): Promise<Appointment[]> {
    const dateFind = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format(
      'YYYY-MM-DD',
    );

    const keyCache = `appointments:${provider_UserId}-${dateFind}`;

    // let appointments = await this.caches.recover<Appointment[]>(keyCache);
    let appointments;
    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllDayProvider({
        provider_UserId,
        day,
        month,
        year,
      });
      appointments = classToClass(appointments);
      await this.caches.save(keyCache, appointments);
    }

    return appointments;
  }
}

export default ListAppointmentsServices;
