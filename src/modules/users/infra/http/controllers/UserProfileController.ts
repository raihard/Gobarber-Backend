// index, show, create, update, delete
import { Request, Response } from 'express';

import { container } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import UpdateProfileUserServices from '@modules/users/services/UpdateProfileUserServices';
import ShowProfileUserServices from '@modules/users/services/ShowProfileUserServices';

export default class UserProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const showProfileUserServices = container.resolve(ShowProfileUserServices);
    const user = await showProfileUserServices.execute(user_id);
    delete user.password;
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, oldpassword, password } = request.body;

    const uploadProfileUser = container.resolve(UpdateProfileUserServices);

    const user = await uploadProfileUser.execute({
      user_id,
      name,
      email,
      oldpassword,
      password,
    });
    delete user.password;
    return response.json(user);
  }
}
