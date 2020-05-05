import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointments';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

interface IParmsRequest {
  provider_UserId: string;
  parsedDate: Date;
}

class CreateAppointmentsServices {
  public async execute({
    parsedDate,
    provider_UserId,
  }: IParmsRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const startOfHourAgendamento = startOfHour(parsedDate);

    const existAgendamento = await appointmentsRepository.buscaAgendamento(
      startOfHourAgendamento,
    );

    if (existAgendamento) throw new AppError('A agenda esta bloqueada', 401);

    const appointment = appointmentsRepository.create({
      date: startOfHourAgendamento,
      provider_UserId,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentsServices;
