import { container } from 'tsyringe';

import ICaches from '@modules/Caches/models/ICaches';
import RedisCache from '@modules/Caches/implaments/RedisCache';

container.registerSingleton<ICaches>('Caches', RedisCache);
