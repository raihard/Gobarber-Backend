import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
import moment from 'moment';

interface IListDayhAvailability {
  hour: number;
  minute: number;
  available: boolean;
}

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListDayAvailabilityServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IListDayhAvailability[]> {
    const appointments = await this.appointmentsRepository.findAllDayProvider({
      provider_UserId: provider_id,
      day,
      month,
      year,
    });
    const dateFind = moment(
      `${year}-${month}-${day} 00:00`,
      'YYYY-MM-DD HH:mm',
    );
    const available = [];

    do {
      const isAvailable = appointments.find(
        appointment => appointment.date.getHours() === dateFind.hour(),
      );

      available.push({
        hour: dateFind.hour(),
        minute: dateFind.minute(),
        available: !isAvailable,
      });
      dateFind.add(1, 'h');
    } while (dateFind.date() === day);

    return available;
  }
}

export default ListDayAvailabilityServices;
