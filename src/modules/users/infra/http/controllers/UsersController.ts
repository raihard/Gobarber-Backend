import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUsersServices from '@modules/users/services/CreateUsersServices';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUsersServices = container.resolve(CreateUsersServices);

    const user = await createUsersServices.execute({
      name,
      email,
      password,
    });

    delete user.password;
    return response.json(user);
  }
}
