"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ResetPasswordServices = _interopRequireDefault(require("../../../services/ResetPasswordServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async create(request, response) {
    const {
      token,
      password
    } = request.body;

    const resetPassword = _tsyringe.container.resolve(_ResetPasswordServices.default);

    await resetPassword.execute({
      token,
      password
    });
    return response.status(204).json();
  }

}

exports.default = SessionsController;