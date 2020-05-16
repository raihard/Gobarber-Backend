import ISendMailDTO from '@shared/container/providers/Mail/dtos/ISendMailDTO';
import ISendMail from '@shared/container/providers/Mail/ISendMail';

export default class FakeMailtrapSend implements ISendMail {
  private messages: ISendMailDTO[] = [];

  public async SendEmail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
