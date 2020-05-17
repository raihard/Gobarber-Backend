import { Router } from 'express';
import multer from 'multer';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserProfileController from '@modules/users/infra/http/controllers/UserProfileController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UploadConfig from '@config/upload';

const routes = Router();
const upload = multer(UploadConfig);
const usersController = new UsersController();
const userProfileController = new UserProfileController();
const userAvatarController = new UserAvatarController();

routes.post('/', usersController.create);
routes.post('/profile', ensureAuthenticated, userProfileController.update);
routes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default routes;
