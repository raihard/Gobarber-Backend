import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListMonthAvailabilityServices from '@modules/appointments/services/ListMonthAvailabilityServices';

export default class ListMonthAvailabilityControlles {
  public async show(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listMonthAvailability = container.resolve(
      ListMonthAvailabilityServices,
    );
    const availability = await listMonthAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });
    return response.json(availability);
  }
}
