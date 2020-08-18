"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class MailtrapSend {
  async SendEmail({
    to
  }) {
    console.log('to', to);
  }

}

exports.default = MailtrapSend;