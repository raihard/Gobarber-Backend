"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListDayAvailabilityServices = _interopRequireDefault(require("../../../services/ListDayAvailabilityServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListMonthAvailabilityControlles {
  async show(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      day,
      month,
      year
    } = request.query;

    const listDayAvailability = _tsyringe.container.resolve(_ListDayAvailabilityServices.default);

    const availability = await listDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });
    return response.json(availability);
  }

}

exports.default = ListMonthAvailabilityControlles;