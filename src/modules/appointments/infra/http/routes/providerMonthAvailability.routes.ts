import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListMonthAvailabilityControlles from '@modules/appointments/infra/http/controllers/ListMonthAvailabilityControlles';

const routes = Router();
routes.use(ensureAuthenticated);

const listMonthAvailabilityControlles = new ListMonthAvailabilityControlles();

routes.get('/', listMonthAvailabilityControlles.show);
export default routes;
