"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DiskStorage {
  async SaveFile(file) {
    await _fs.default.promises.rename(_path.default.resolve(_upload.default.pathTmp, file), _path.default.resolve(_upload.default.pathUploads, file));
    return file;
  }

  async RemoveFile(file) {
    const filePath = _path.default.resolve(_upload.default.pathUploads, file);

    try {
      await _fs.default.promises.stat(filePath);
      await _fs.default.promises.unlink(filePath);
    } catch {
      console.log('RemoveFile filePath', filePath);
    }
  }

}

exports.default = DiskStorage;