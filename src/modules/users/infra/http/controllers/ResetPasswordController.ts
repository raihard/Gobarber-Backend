import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ResetPasswordServices from '@modules/users/services/ResetPasswordServices';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPassword = container.resolve(ResetPasswordServices);

    await resetPassword.execute({ token, password });

    return response.status(204).json();
  }
}
