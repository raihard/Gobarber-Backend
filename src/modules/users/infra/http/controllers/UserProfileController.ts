// index, show, create, update, delete
import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UploadProfileUserServices from '@modules/users/services/UploadProfileUserServices';

export default class UserProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, oldpassword, password } = request.body;

    const uploadProfileUser = container.resolve(UploadProfileUserServices);

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
