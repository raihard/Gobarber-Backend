import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListDayAvailabilityServices from '@modules/appointments/services/ListDayAvailabilityServices';

export default class ListMonthAvailabilityControlles {
  public async show(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const listDayAvailability = container.resolve(ListDayAvailabilityServices);
    const availability = await listDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });
    return response.json(availability);
  }
}
