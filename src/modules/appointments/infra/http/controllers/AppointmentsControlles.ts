import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentsServices from '@modules/appointments/services/CreateAppointmentsServices';

export default class AppointmentsControlles {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_UserId, toAnotherUser_id, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointmentsServices = container.resolve(
      CreateAppointmentsServices,
    );
    const appointment = await createAppointmentsServices.execute({
      provider_UserId,
      loggedUser_id: user_id,
      toAnotherUser_id,
      parsedDate,
    });
    return response.json(appointment);
  }
}
