"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IAppointmentsRepository = _interopRequireDefault(require("../repositores/IAppointmentsRepository"));

var _moment = _interopRequireDefault(require("moment"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListMonthAvailabilityServices = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListMonthAvailabilityServices {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({
    provider_id,
    month,
    year
  }) {
    const appointments = await this.appointmentsRepository.findAllMonthProvider({
      provider_UserId: provider_id,
      month,
      year
    });
    const dateFind = (0, _moment.default)(`${year}-${month}-01`, 'YYYY-MM-DD');
    const available = [];

    do {
      const isAvailable = appointments.filter(appointment => (0, _moment.default)(appointment.date).date() === dateFind.date());
      available.push({
        day: dateFind.date(),
        available: isAvailable.length < 10
      });
      dateFind.add(1, 'd');
    } while (dateFind.month() + 1 === month);

    return available;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListMonthAvailabilityServices;
exports.default = _default;