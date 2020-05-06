import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentsServices from '@modules/appointments/services/CreateAppointmentsServices';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

routes.use(ensureAuthenticated);

// routes.get('/', async (request, response) => {
//   // const ListaAgendamentos = await appointmentsRepository.find();
//   // response.json(ListaAgendamentos);
// });

routes.post('/', async (request, response) => {
  const { provider_UserId, date } = request.body;
  const parsedDate = parseISO(date);
  const appointmentsRepository = new AppointmentsRepository();
  const createAppointmentsServices = new CreateAppointmentsServices(
    appointmentsRepository,
  );
  const appointment = await createAppointmentsServices.execute({
    provider_UserId,
    parsedDate,
  });
  return response.json(appointment);
});
export default routes;
