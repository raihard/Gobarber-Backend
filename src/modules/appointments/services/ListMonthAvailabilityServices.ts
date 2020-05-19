import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
import moment from 'moment';

interface IListMonthAvailability {
  day: number;
  available: boolean;
}

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

@injectable()
class ListMonthAvailabilityServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IListMonthAvailability[]> {
    const appointments = await this.appointmentsRepository.findAllMonthProvider(
      { provider_UserId: provider_id, month, year },
    );
    const dateFind = moment(`${year}-${month}-01`, 'YYYY-MM-DD');
    const available = [];

    do {
      const isAvailable = appointments.filter(
        appointment => appointment.date.getDate() === dateFind.date(),
      );

      available.push({
        day: dateFind.date(),
        available: isAvailable.length < 10,
      });
      dateFind.add(1, 'd');
    } while (dateFind.month() + 1 === month);

    return available;
  }
}

export default ListMonthAvailabilityServices;
