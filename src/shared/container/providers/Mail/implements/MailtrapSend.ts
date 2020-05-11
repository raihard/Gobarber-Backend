import ISendMail from '../ISendMail';

export default class MailtrapSend implements ISendMail {
  private storage: string[] = [];

  public async SendEmail(email: string): Promise<string> {
    return '';
  }
}
