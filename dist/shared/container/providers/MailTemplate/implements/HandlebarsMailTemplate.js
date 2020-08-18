"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HandlebarsMailTemplate {
  async parse({
    templateFile,
    varibles
  }) {
    const readtemplateFile = await _fs.default.promises.readFile(templateFile, {
      encoding: 'utf-8'
    });

    const parseTemplate = _handlebars.default.compile(readtemplateFile);

    return parseTemplate(varibles);
  }

}

var _default = HandlebarsMailTemplate;
exports.default = _default;