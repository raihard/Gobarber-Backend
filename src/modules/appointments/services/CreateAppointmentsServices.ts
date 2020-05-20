import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import moment from 'moment';

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

    const dateAgendamento = moment(startOfHourAgendamento);
    const dateCurrent = moment(moment.now());
    const availableStartTime = moment(dateCurrent).hour(8);
    const availableEndTime = moment(dateCurrent).hour(17);

    if (!dateAgendamento.isBetween(availableStartTime, availableEndTime))
      throw new AppError(
        'Não é permetido agendar antes das 18 ou depois da 17horas',
        401,
      );

    if (user_id === provider_UserId)
      throw new AppError('Não é permetido agendar para você mesmo!', 401);

    if (dateAgendamento.isBefore(dateCurrent))
      throw new AppError('Não é permetido agendar no passado!', 401);

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
