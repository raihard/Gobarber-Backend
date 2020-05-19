import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListDayAvailabilityControlles from '@modules/appointments/infra/http/controllers/ListDayAvailabilityControlles';

const routes = Router();
routes.use(ensureAuthenticated);

const listDayAvailabilityControlles = new ListDayAvailabilityControlles();

routes.get('/', listDayAvailabilityControlles.show);
export default routes;
