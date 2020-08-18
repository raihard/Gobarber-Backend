"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const pathUploads = path.resolve(__dirname, '..', '..', '..', 'uploads');
const pathTmp = _path.default.resolve(__dirname, '..', '..', 'tmp');

var _default = {
  pathTmp,
  pathUploads: _path.default.resolve(pathTmp, 'uploads'),
  storage: _multer.default.diskStorage({
    destination: pathTmp,
    filename: (req, file, cb) => {
      const extname = _path.default.extname(file.originalname);

      const basename = _path.default.basename(file.originalname, extname);

      return cb(null, `${basename}-${Date.now()}${extname}`);
    }
  })
};
exports.default = _default;