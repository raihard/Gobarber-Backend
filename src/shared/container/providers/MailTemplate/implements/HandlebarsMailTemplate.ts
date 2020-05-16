import handlebars from 'handlebars';
import IMailTemplate from '@shared/container/providers/MailTemplate/models/IMailTemplate';
import IParseMailTemplateDTO from '@shared/container/providers/MailTemplate/dtos/IParseMailTemplateDTO';
import fs from 'fs';

class HandlebarsMailTemplate implements IMailTemplate {
  public async parse({
    templateFile,
    varibles,
  }: IParseMailTemplateDTO): Promise<string> {
    const readtemplateFile = await fs.promises.readFile(templateFile, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(readtemplateFile);

    return parseTemplate(varibles);
  }
}

export default HandlebarsMailTemplate;
