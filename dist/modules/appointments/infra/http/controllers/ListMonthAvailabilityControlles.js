"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListMonthAvailabilityServices = _interopRequireDefault(require("../../../services/ListMonthAvailabilityServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListMonthAvailabilityControlles {
  async show(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      month,
      year
    } = request.query;

    const listMonthAvailability = _tsyringe.container.resolve(_ListMonthAvailabilityServices.default);

    const availability = await listMonthAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year)
    });
    return response.json(availability);
  }

}

exports.default = ListMonthAvailabilityControlles;