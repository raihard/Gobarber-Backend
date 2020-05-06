// index, show, create, update, delete
import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UploadAvatarUserServices from '@modules/users/services/UploadAvatarUserServices';

export default class UsersController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;

    const uploadAvatarUser = container.resolve(UploadAvatarUserServices);
    const user = await uploadAvatarUser.execute({
      user_id: request.user.id,
      avatar_filename: filename,
    });
    delete user.password;
    return response.json(user);
  }
}
