import ISendMailDTO from '@shared/container/providers/Mail/dtos/ISendMailDTO';

export default interface ISendMail {
  SendEmail(data: ISendMailDTO): Promise<void>;
}
