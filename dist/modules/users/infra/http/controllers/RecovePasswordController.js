"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _RecoverPasswordServices = _interopRequireDefault(require("../../../services/RecoverPasswordServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async create(request, response) {
    const {
      email
    } = request.body;

    const recoverPasswor = _tsyringe.container.resolve(_RecoverPasswordServices.default);

    await recoverPasswor.execute({
      email
    });
    return response.status(204).json();
  }

}

exports.default = SessionsController;