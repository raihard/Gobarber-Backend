import { injectable, inject } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import IMailTemplate from '@shared/container/providers/MailTemplate/models/IMailTemplate';
import ISendMailDTO from '@shared/container/providers/Mail/dtos/ISendMailDTO';
import ISendMail from '../ISendMail';

@injectable()
export default class EtherealMail implements ISendMail {
  private client: Transporter;

  constructor(
    @inject('MailTemplate')
    private mailTemplate: IMailTemplate,
  ) {
    nodemailer.createTestAccount().then(account => {
      // Create a SMTP transporter object
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
      // console.log('account mail ', account);
    });
  }

  public async SendEmail({
    to,
    subject,
    templateData,
    from,
  }: ISendMailDTO): Promise<void> {
    const info = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobaber.com',
      },
      to: { name: to.name, address: to.email },
      subject,
      html: await this.mailTemplate.parse(templateData),
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
