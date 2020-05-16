import IMailTemplate from '@shared/container/providers/MailTemplate/models/IMailTemplate';
import IParseMailTemplateDTO from '@shared/container/providers/MailTemplate/dtos/IParseMailTemplateDTO';

class FakeMailTemplate implements IMailTemplate {
  public async parse({
    templateFile,
    varibles,
  }: IParseMailTemplateDTO): Promise<string> {
    return 'Fake Mail Template';
  }
}

export default FakeMailTemplate;
