import { Router } from 'express';

import RecovePasswordController from '@modules/users/infra/http/controllers/RecovePasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const routes = Router();
const recovePasswordController = new RecovePasswordController();
const resetPasswordController = new ResetPasswordController();

routes.post('/forgot', recovePasswordController.create);
routes.post('/reset', resetPasswordController.create);

export default routes;
