import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListProviversControlles from '@modules/appointments/infra/http/controllers/ListProviversControlles';

const routes = Router();
routes.use(ensureAuthenticated);

const proviversControlles = new ListProviversControlles();

routes.get(
  '/',
  // celebrate({
  //   [Segments.QUERY]: {
  //     provider_id: Joi.string().required().uuid(),
  //   },
  // }),
  proviversControlles.show,
);
export default routes;
