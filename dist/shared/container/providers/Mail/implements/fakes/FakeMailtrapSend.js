"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeMailtrapSend {
  constructor() {
    this.messages = [];
  }

  async SendEmail(message) {
    this.messages.push(message);
  }

}

exports.default = FakeMailtrapSend;