import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserProfileController from '@modules/users/infra/http/controllers/UserProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

const userProfileController = new UserProfileController();
//  name, email, oldpassword, password
routes.get('/', ensureAuthenticated, userProfileController.show);
routes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
      oldpassword: Joi.string(),
    },
  }),
  ensureAuthenticated,
  userProfileController.update,
);

export default routes;
