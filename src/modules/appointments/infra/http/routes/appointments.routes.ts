import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsControlles from '@modules/appointments/infra/http/controllers/AppointmentsControlles';

const routes = Router();
routes.use(ensureAuthenticated);

const appointmentsControlles = new AppointmentsControlles();

// routes.get('/', async (request, response) => {
//   const ListaAgendamentos = await appointmentsRepository.find();
//   response.json(ListaAgendamentos);
// });

routes.post('/', appointmentsControlles.create);
export default routes;
