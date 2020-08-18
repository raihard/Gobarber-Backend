"use strict";

var _tsyringe = require("tsyringe");

var _HandlebarsMailTemplate = _interopRequireDefault(require("./implements/HandlebarsMailTemplate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('MailTemplate', _HandlebarsMailTemplate.default);