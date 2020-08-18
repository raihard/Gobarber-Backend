"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _CreateAppointmentsServices = _interopRequireDefault(require("../../../services/CreateAppointmentsServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsControlles {
  async create(request, response) {
    const user_id = request.user.id;
    const {
      provider_UserId,
      toAnotherUser_id,
      date
    } = request.body;
    const parsedDate = (0, _dateFns.parseISO)(date);

    const createAppointmentsServices = _tsyringe.container.resolve(_CreateAppointmentsServices.default);

    const appointment = await createAppointmentsServices.execute({
      provider_UserId,
      loggedUser_id: user_id,
      toAnotherUser_id,
      parsedDate
    });
    return response.json(appointment);
  }

}

exports.default = AppointmentsControlles;