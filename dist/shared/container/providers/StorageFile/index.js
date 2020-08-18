"use strict";

var _tsyringe = require("tsyringe");

var _DiskStorage = _interopRequireDefault(require("./implements/DiskStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('StorageFile', _DiskStorage.default);