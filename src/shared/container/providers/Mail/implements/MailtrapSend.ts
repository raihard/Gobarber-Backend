import ISendMailDTO from '@shared/container/providers/Mail/dtos/ISendMailDTO';
import ISendMail from '../ISendMail';

export default class MailtrapSend implements ISendMail {
  public async SendEmail({ to }: ISendMailDTO): Promise<void> {
    console.log('to', to);
  }
}
