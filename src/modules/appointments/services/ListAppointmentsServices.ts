import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
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
  ) {}

  public async execute({
    provider_UserId,
    day,
    month,
    year,
  }: IParmsRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllDayProvider({
      provider_UserId,
      day,
      month,
      year,
    });

    return appointments;
  }
}

export default ListAppointmentsServices;
