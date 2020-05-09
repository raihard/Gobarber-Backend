import { container } from 'tsyringe';

import DiskStorage from '@shared/container/providers/StorageFile/implements/DiskStorage';
import IStorageFile from '@shared/container/providers/StorageFile/IStorageFile';

container.registerSingleton<IStorageFile>('StorageFile', DiskStorage);
