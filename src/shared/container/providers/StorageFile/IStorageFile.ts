export default interface IStorageFile {
  SaveFile(file: string): Promise<string>;
  RemoveFile(file: string): Promise<void>;
}
