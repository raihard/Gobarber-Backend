import { container } from 'tsyringe';

import BCryptHashPassword from '@modules/users/providers/HashPassword/implements/BCryptHashPassword';
import IHashPassword from './HashPassword/IHashPassword';

container.registerSingleton<IHashPassword>('HashPassword', BCryptHashPassword);
