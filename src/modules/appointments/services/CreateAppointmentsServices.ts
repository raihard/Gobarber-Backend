import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointments';

interface IParmsRequest {
  provider_UserId: string;
  user_id: string;
  parsedDate: Date;
}
@injectable()
class CreateAppointmentsServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    parsedDate,
    user_id,
    provider_UserId,
  }: IParmsRequest): Promise<Appointment> {
    const startOfHourAgendamento = startOfHour(parsedDate);

    const existAgendamento = await this.appointmentsRepository.findbyDate(
      startOfHourAgendamento,
    );

    if (existAgendamento) throw new AppError('A agenda esta bloqueada', 401);

    const appointment = await this.appointmentsRepository.create({
      date: startOfHourAgendamento,
      user_id,
      provider_UserId,
    });

    return appointment;
  }
}

export default CreateAppointmentsServices;
