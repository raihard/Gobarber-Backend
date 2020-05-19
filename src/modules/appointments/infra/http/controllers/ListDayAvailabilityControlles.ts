import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListDayAvailabilityServices from '@modules/appointments/services/ListDayAvailabilityServices';

export default class ListMonthAvailabilityControlles {
  public async show(request: Request, response: Response): Promise<Response> {
    const { provider_id, day, month, year } = request.body;

    const listDayAvailability = container.resolve(ListDayAvailabilityServices);
    const availability = await listDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });
    return response.json(availability);
  }
}
