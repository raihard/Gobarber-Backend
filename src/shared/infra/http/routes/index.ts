import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providerMonthAvailabilityRouter from '@modules/appointments/infra/http/routes/providerMonthAvailability.routes';
import providerDayAvailabilityRouter from '@modules/appointments/infra/http/routes/providerDayAvailability.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.status(204).json();
});

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);

routes.use('/providers', providersRouter);
routes.use('/:provider_id/MonthAvailability', providerMonthAvailabilityRouter);
routes.use('/:provider_id/DayAvailability', providerDayAvailabilityRouter);
routes.use('/appointments', appointmentsRouter);
export default routes;
