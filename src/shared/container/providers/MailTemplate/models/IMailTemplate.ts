import IParseMailTemplateDTO from '@shared/container/providers/MailTemplate/dtos/IParseMailTemplateDTO';

export default interface IMailTemplate {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
