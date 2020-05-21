import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsControlles from '@modules/appointments/infra/http/controllers/AppointmentsControlles';
import ListProviversControlles from '@modules/appointments/infra/http/controllers/ListProviversControlles';

const routes = Router();
routes.use(ensureAuthenticated);

const appointmentsControlles = new AppointmentsControlles();
const listProviversControlles = new ListProviversControlles();

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_UserId: Joi.string().required().uuid(),
      date: Joi.string().isoDate(),
    },
  }),
  appointmentsControlles.create,
);
routes.post('/me', listProviversControlles.show);
export default routes;
