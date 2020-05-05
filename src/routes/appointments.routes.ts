import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsServices from '../services/CreateAppointmentsServices';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();
routes.use(ensureAuthenticated);

routes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const ListaAgendamentos = await appointmentsRepository.find();

  response.json(ListaAgendamentos);
});

routes.post('/', async (request, response) => {
  const { provider_UserId, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointmentsServices = new CreateAppointmentsServices();
  const appointment = await createAppointmentsServices.execute({
    provider_UserId,
    parsedDate,
  });

  return response.json(appointment);
});
export default routes;
