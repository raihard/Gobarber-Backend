"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Appointments = _interopRequireDefault(require("../../infra/typeorm/entities/Appointments"));

var _uuidv = require("uuidv4");

var _dateFns = require("date-fns");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsRepository {
  constructor() {
    this.appointments = [];
  }

  async findAllMonthProvider({
    provider_UserId,
    month,
    year
  }) {
    const datefind = (0, _moment.default)(`${year}-${month}-01`, 'YYYY-MM-DD');
    const listAppointment = this.appointments.filter(appointment => {
      return appointment.provider_UserId === provider_UserId && (0, _dateFns.isEqual)(appointment.date.getFullYear(), datefind.year()) && (0, _dateFns.isEqual)(appointment.date.getMonth(), datefind.month());
    });
    return listAppointment;
  }

  async findAllDayProvider({
    provider_UserId,
    day,
    month,
    year
  }) {
    const datefind = (0, _moment.default)(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    const listAppointment = this.appointments.filter(appointment => {
      return appointment.provider_UserId === provider_UserId && (0, _dateFns.isEqual)(appointment.date.getFullYear(), datefind.year()) && (0, _dateFns.isEqual)(appointment.date.getMonth(), datefind.month()) && (0, _dateFns.isEqual)(appointment.date.getDate(), datefind.date());
    });
    return listAppointment;
  }

  async findbyDate(date, provider_UserId) {
    const appointment = this.appointments.find(item => (0, _dateFns.isEqual)(item.date, date) && item.provider_UserId === provider_UserId);
    return appointment;
  }

  async create({
    date,
    user_id,
    provider_UserId
  }) {
    const appointment = new _Appointments.default();
    Object.assign(appointment, {
      id: (0, _uuidv.uuid)(),
      date,
      provider_UserId,
      user_id
    });
    this.appointments.push(appointment);
    return appointment;
  }

}

var _default = AppointmentsRepository;
exports.default = _default;