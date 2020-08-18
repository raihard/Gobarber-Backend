"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeBCryptHashPassword {
  async HashCrete(password) {
    return password;
  }

  async HashCompare(password, hashPassword) {
    return password === hashPassword;
  }

}

exports.default = FakeBCryptHashPassword;