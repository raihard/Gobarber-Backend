import path from 'path';

import UploadConfig from '@config/upload';
import IStorageFile from '../../IStorageFile';

export default class DiskStorage implements IStorageFile {
  private storage: string[] = [];

  public async SaveFile(file: string): Promise<string> {
    const filepath = path.join(UploadConfig.pathUploads, file);
    this.storage.push(filepath);
    return filepath;
  }

  public async RemoveFile(file: string): Promise<void> {
    const filepathIndex = this.storage.findIndex(
      fileindex => fileindex === file,
    );
    this.storage.splice(filepathIndex, 1);
  }
}
