"use strict";

var _tsyringe = require("tsyringe");

var _mail = _interopRequireDefault(require("../../../../config/mail"));

var _SESMail = _interopRequireDefault(require("./implements/SESMail"));

var _EtherealMail = _interopRequireDefault(require("./implements/EtherealMail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  ethereal: _tsyringe.container.resolve(_EtherealMail.default),
  ses: _tsyringe.container.resolve(_SESMail.default)
};

_tsyringe.container.registerInstance('SendMail', providers[_mail.default.driver]);