import { Request, Response } from 'express';

import { container } from 'tsyringe';

import RecoverPasswordServices from '@modules/users/services/RecoverPasswordServices';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const recoverPasswor = container.resolve(RecoverPasswordServices);

    await recoverPasswor.execute({ email });

    return response.status(204).json();
  }
}
