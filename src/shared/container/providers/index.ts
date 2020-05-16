import { container } from 'tsyringe';

import DiskStorage from '@shared/container/providers/StorageFile/implements/DiskStorage';
import IStorageFile from '@shared/container/providers/StorageFile/IStorageFile';

import EtherealMail from '@shared/container/providers/Mail/implements/EtherealMail';
import ISendMail from '@shared/container/providers/Mail/ISendMail';

import IMailTemplate from '@shared/container/providers/MailTemplate/models/IMailTemplate';
import HandlebarsMailTemplate from '@shared/container/providers/MailTemplate/implements/HandlebarsMailTemplate';

container.registerSingleton<IStorageFile>('StorageFile', DiskStorage);

container.registerSingleton<IMailTemplate>(
  'MailTemplate',
  HandlebarsMailTemplate,
);

container.registerInstance<ISendMail>(
  'SendMail',
  container.resolve(EtherealMail),
);
