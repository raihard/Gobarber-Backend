import { Router } from 'express';

import UserProfileController from '@modules/users/infra/http/controllers/UserProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

const userProfileController = new UserProfileController();

routes.post('/', ensureAuthenticated, userProfileController.show);
routes.put('/', ensureAuthenticated, userProfileController.update);

export default routes;
