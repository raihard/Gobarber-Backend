import ISendMailDTO from '@shared/container/dtos/ISendMailDTO';

export default interface IStorageFile {
  SendEmail(data: ISendMailDTO): Promise<string>;
}
