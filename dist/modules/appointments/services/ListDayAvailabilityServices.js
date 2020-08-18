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

let ListDayAvailabilityServices = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListDayAvailabilityServices {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({
    provider_id,
    day,
    month,
    year
  }) {
    const appointments = await this.appointmentsRepository.findAllDayProvider({
      provider_UserId: provider_id,
      day,
      month,
      year
    });
    const dateFind = (0, _moment.default)(`${year}-${month}-${day} 00:00`, 'YYYY-MM-DD HH:mm');
    const available = [];
    const dateCurrent = (0, _moment.default)(_moment.default.now()); //  should be able to schedule only 15 before
    // dateCurrent.add(-15, 'm');

    const availableStartTime = (0, _moment.default)(dateFind).hour(8);
    const availableEndTime = (0, _moment.default)(dateFind).hour(17);

    do {
      const appointmentFind = appointments.find(appointment => (0, _moment.default)(appointment.date).hour() === dateFind.hour());
      const isAvailable = dateFind >= availableStartTime && dateFind <= availableEndTime && dateFind.isAfter(dateCurrent) && !appointmentFind;
      available.push({
        hour: dateFind.hour(),
        minute: dateFind.minute(),
        available: isAvailable
      });
      dateFind.add(1, 'h');
    } while (dateFind.date() === day);

    return available;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListDayAvailabilityServices;
exports.default = _default;