export default interface IStorageFile {
  SendEmail(email: string): Promise<string>;
}
