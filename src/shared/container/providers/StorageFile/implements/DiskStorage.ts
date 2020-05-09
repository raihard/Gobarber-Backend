import path from 'path';
import fs from 'fs';
import UploadConfig from '@config/upload';
import IStorageFile from '../IStorageFile';

export default class DiskStorage implements IStorageFile {
  public async SaveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(UploadConfig.pathTmp, file),
      path.resolve(UploadConfig.pathUploads, file),
    );
    return file;
  }

  public async RemoveFile(file: string): Promise<void> {
    const filePath = path.resolve(UploadConfig.pathUploads, file);

    try {
      await fs.promises.stat(filePath);
      await fs.promises.unlink(filePath);
    } catch {
      console.log('RemoveFile filePath', filePath);
    }
  }
}
