"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _upload = _interopRequireDefault(require("../../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DiskStorage {
  constructor() {
    this.storage = [];
  }

  async SaveFile(file) {
    const filepath = _path.default.join(_upload.default.pathUploads, file);

    this.storage.push(filepath);
    return filepath;
  }

  async RemoveFile(file) {
    const filepathIndex = this.storage.findIndex(fileindex => fileindex === file);
    this.storage.splice(filepathIndex, 1);
  }

}

exports.default = DiskStorage;