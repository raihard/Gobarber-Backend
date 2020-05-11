import { container } from 'tsyringe';

import DiskStorage from '@shared/container/providers/StorageFile/implements/DiskStorage';
import IStorageFile from '@shared/container/providers/StorageFile/IStorageFile';

import MailtrapSend from '@shared/container/providers/Mail/implements/MailtrapSend';
import ISendMail from '@shared/container/providers/Mail/ISendMail';

container.registerSingleton<IStorageFile>('StorageFile', DiskStorage);
container.registerSingleton<ISendMail>('SendMail', MailtrapSend);
