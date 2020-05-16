interface IParseMailTemplateVariables {
  [key: string]: string | number;
}
export default interface IParseMailTemplateDTO {
  templateFile: string;
  varibles: IParseMailTemplateVariables;
}
