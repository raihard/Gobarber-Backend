import { container } from 'tsyringe';

import IMailTemplate from '@shared/container/providers/MailTemplate/models/IMailTemplate';
import HandlebarsMailTemplate from '@shared/container/providers/MailTemplate/implements/HandlebarsMailTemplate';

container.registerSingleton<IMailTemplate>(
  'MailTemplate',
  HandlebarsMailTemplate,
);
