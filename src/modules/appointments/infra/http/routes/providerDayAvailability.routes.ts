import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListDayAvailabilityControlles from '@modules/appointments/infra/http/controllers/ListDayAvailabilityControlles';

const routes = Router();
routes.use(ensureAuthenticated);

const listDayAvailabilityControlles = new ListDayAvailabilityControlles();

routes.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().required().uuid(),
      day: Joi.number().required(),
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  listDayAvailabilityControlles.show,
);

routes.get(
  '/:provider_id/',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().required().uuid(),
    },
  }),
  listDayAvailabilityControlles.show,
);

export default routes;
