import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointments';

interface IParmsRequest {
  provider_UserId: string;
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
    provider_UserId,
  }: IParmsRequest): Promise<Appointment> {
    const startOfHourAgendamento = startOfHour(parsedDate);

    const existAgendamento = await this.appointmentsRepository.buscaAgendamento(
      startOfHourAgendamento,
    );

    if (existAgendamento) throw new AppError('A agenda esta bloqueada', 401);

    const appointment = await this.appointmentsRepository.create({
      date: startOfHourAgendamento,
      provider_UserId,
    });

    return appointment;
  }
}

export default CreateAppointmentsServices;
