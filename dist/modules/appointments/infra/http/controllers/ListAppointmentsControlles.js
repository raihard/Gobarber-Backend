"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListAppointmentsServices = _interopRequireDefault(require("../../../services/ListAppointmentsServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsControlles {
  async show(request, response) {
    const provider_UserId = request.user.id;
    const {
      day,
      month,
      year
    } = request.query;

    const listDayAvailability = _tsyringe.container.resolve(_ListAppointmentsServices.default);

    const availability = await listDayAvailability.execute({
      provider_UserId,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });
    return response.json(availability);
  }

}

exports.default = AppointmentsControlles;