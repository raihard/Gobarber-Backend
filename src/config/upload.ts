import multer from 'multer';
import path from 'path';

// const pathUploads = path.resolve(__dirname, '..', '..', '..', 'uploads');
const pathTmp = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  pathTmp,
  pathUploads: path.resolve(pathTmp, 'uploads'),
  storage: multer.diskStorage({
    destination: pathTmp,
    filename: (req, file, cb) => {
      const extname = path.extname(file.originalname);
      const basename = path.basename(file.originalname, extname);
      return cb(null, `${basename}-${Date.now()}${extname}`);
    },
  }),
};
