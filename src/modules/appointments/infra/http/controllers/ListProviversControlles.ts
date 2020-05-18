import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProviderServices from '@modules/appointments/services/ListProviderServices';

export default class ListProviversControlles {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProvider = container.resolve(ListProviderServices);
    const appointment = await listProvider.execute({ except_user_id: user_id });
    return response.json(appointment);
  }
}
