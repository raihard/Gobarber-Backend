import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAppointmentsServices from '@modules/appointments/services/ListAppointmentsServices';

export default class AppointmentsControlles {
  public async show(request: Request, response: Response): Promise<Response> {
    const provider_UserId = request.user.id;
    const { day, month, year } = request.body;

    const listDayAvailability = container.resolve(ListAppointmentsServices);
    const availability = await listDayAvailability.execute({
      provider_UserId,
      day,
      month,
      year,
    });
    return response.json(availability);
  }
}
