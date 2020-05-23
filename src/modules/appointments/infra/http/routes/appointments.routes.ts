import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsControlles from '@modules/appointments/infra/http/controllers/AppointmentsControlles';
import ListAppointmentsControlles from '@modules/appointments/infra/http/controllers/ListAppointmentsControlles';

const routes = Router();
routes.use(ensureAuthenticated);

const appointmentsControlles = new AppointmentsControlles();
const listAppointmentsControlles = new ListAppointmentsControlles();

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_UserId: Joi.string().required().uuid(),
      toAnotherUser_id: Joi.string().uuid(),
      date: Joi.string().isoDate(),
    },
  }),
  appointmentsControlles.create,
);
routes.get('/me', listAppointmentsControlles.show);
export default routes;
