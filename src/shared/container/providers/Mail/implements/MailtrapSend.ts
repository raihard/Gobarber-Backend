import ISendMailDTO from '@shared/container/dtos/ISendMailDTO';
import ISendMail from '../ISendMail';

export default class MailtrapSend implements ISendMail {
  public async SendEmail({ to, body }: ISendMailDTO): Promise<string> {
    console.log('to', to);
    return body;
  }
}
