"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeMailTemplate {
  async parse({
    templateFile,
    varibles
  }) {
    return 'Fake Mail Template';
  }

}

var _default = FakeMailTemplate;
exports.default = _default;