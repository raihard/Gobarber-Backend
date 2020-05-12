import ISendMailDTO from '@shared/container/dtos/ISendMailDTO';
import ISendMail from '../../ISendMail';

export default class FakeMailtrapSend implements ISendMail {
  public async SendEmail({ to, body }: ISendMailDTO): Promise<string> {
    console.log('to', to);
    console.log('body', body);
    return body;
  }
}
