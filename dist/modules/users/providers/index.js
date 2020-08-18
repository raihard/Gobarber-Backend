"use strict";

var _tsyringe = require("tsyringe");

var _BCryptHashPassword = _interopRequireDefault(require("./HashPassword/implements/BCryptHashPassword"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('HashPassword', _BCryptHashPassword.default);