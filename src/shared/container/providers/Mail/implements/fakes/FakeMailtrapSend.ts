import ISendMail from '../../ISendMail';

export default class FakeMailtrapSend implements ISendMail {
  private storage: string[] = [];

  public async SendEmail(email: string): Promise<string> {
    return '';
  }
}
