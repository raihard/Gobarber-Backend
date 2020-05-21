import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import SESMail from '@shared/container/providers/Mail/implements/SESMail';
import EtherealMail from '@shared/container/providers/Mail/implements/EtherealMail';
import ISendMail from '@shared/container/providers/Mail/ISendMail';

const providers = {
  ethereal: container.resolve(EtherealMail),
  ses: container.resolve(SESMail),
};

container.registerInstance<ISendMail>('SendMail', providers[mailConfig.driver]);
