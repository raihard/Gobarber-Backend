import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UploadConfig from '@config/upload';

const routes = Router();
const upload = multer(UploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);
routes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default routes;
