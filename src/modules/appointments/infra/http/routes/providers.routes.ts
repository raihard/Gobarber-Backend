import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListProviversControlles from '@modules/appointments/infra/http/controllers/ListProviversControlles';

const routes = Router();
routes.use(ensureAuthenticated);

const proviversControlles = new ListProviversControlles();

routes.get('/', proviversControlles.show);
export default routes;
