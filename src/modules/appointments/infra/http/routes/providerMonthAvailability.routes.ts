import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListMonthAvailabilityControlles from '@modules/appointments/infra/http/controllers/ListMonthAvailabilityControlles';

const routes = Router();
routes.use(ensureAuthenticated);

const listMonthAvailabilityControlles = new ListMonthAvailabilityControlles();

routes.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().required().uuid(),
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  listMonthAvailabilityControlles.show,
);

routes.get(
  '/:provider_id/',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().required().uuid(),
    },
  }),
  listMonthAvailabilityControlles.show,
);

export default routes;
