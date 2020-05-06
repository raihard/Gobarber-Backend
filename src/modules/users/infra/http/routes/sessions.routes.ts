import { Router } from 'express';

import AuthenticateUserServices from '@modules/users/services/AuthenticateUserServices';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const routes = Router();

routes.post('/', async (request, response) => {
  const { email, password } = request.body;
  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUserServices(usersRepository);
  const { user, token } = await authenticateUser.execute({ email, password });
  delete user.password;
  return response.json({ user, token });
});

export default routes;
