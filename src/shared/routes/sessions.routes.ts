import { Router } from 'express';

import AuthenticateUserServices from '../../modules/users/services/AuthenticateUserServices';

const routes = Router();

routes.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUser = new AuthenticateUserServices();
  const { user, token } = await authenticateUser.execute({ email, password });
  delete user.password;
  return response.json({ user, token });
});

export default routes;
