import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import RecovePasswordController from '@modules/users/infra/http/controllers/RecovePasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const routes = Router();
const recovePasswordController = new RecovePasswordController();
const resetPasswordController = new ResetPasswordController();

routes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
    },
  }),
  recovePasswordController.create,
);
routes.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      token: Joi.string().required().uuid(),
    },
  }),
  resetPasswordController.create,
);

export default routes;
