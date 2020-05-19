import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListMonthAvailabilityServices from '@modules/appointments/services/ListMonthAvailabilityServices';

export default class ListMonthAvailabilityControlles {
  public async show(request: Request, response: Response): Promise<Response> {
    const { provider_id, month, year } = request.body;

    const listMonthAvailability = container.resolve(
      ListMonthAvailabilityServices,
    );
    const availability = await listMonthAvailability.execute({
      provider_id,
      month,
      year,
    });
    return response.json(availability);
  }
}
