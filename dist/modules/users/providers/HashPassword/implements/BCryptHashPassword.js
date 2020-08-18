"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

class BCryptHashPassword {
  async HashCrete(password) {
    const hashPassword = await (0, _bcryptjs.hash)(password, 8);
    return hashPassword;
  }

  async HashCompare(password, hashPassword) {
    const isMatched = await (0, _bcryptjs.compare)(password, hashPassword);
    return isMatched;
  }

}

exports.default = BCryptHashPassword;