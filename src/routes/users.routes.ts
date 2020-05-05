import { Router } from 'express';
import multer from 'multer';

import CreateUsersServices from '../services/CreateUsersServices';
import UploadAvatarUserServices from '../services/UploadAvatarUserServices';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UploadConfig from '../config/upload';

const routes = Router();
const upload = multer(UploadConfig);

routes.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUsersServices = new CreateUsersServices();

  const user = await createUsersServices.execute({
    name,
    email,
    password,
  });

  delete user.password;
  return response.json(user);
});

routes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const { filename } = request.file;
    const uploadAvatarUser = new UploadAvatarUserServices();
    const user = await uploadAvatarUser.execute({
      user_id: request.user.id,
      avatar_filename: filename,
    });
    delete user.password;
    return response.json(user);
  },
);

export default routes;
