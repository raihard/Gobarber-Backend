"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _moment = _interopRequireDefault(require("moment"));

var _Appointments = _interopRequireDefault(require("../entities/Appointments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Appointments.default);
  }

  async findAllDayProvider({
    provider_UserId,
    day,
    month,
    year
  }) {
    const dateStart = (0, _moment.default)(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    const dateEnd = (0, _moment.default)(dateStart).add(1, 'd').add(-1, 'second');
    const appointments = await this.ormRepository.find({
      where: {
        provider_UserId,
        date: (0, _typeorm.Between)(dateStart, dateEnd)
      },
      relations: ['user'],
      order: {
        date: 'ASC'
      }
    });
    return appointments;
  }

  async findAllMonthProvider({
    provider_UserId,
    month,
    year
  }) {
    const dateStart = (0, _moment.default)(`${year}-${month}-01`, 'YYYY-MM-DD');
    const dateEnd = (0, _moment.default)(dateStart).add(1, 'month').add(-1, 'second');
    const appointments = await this.ormRepository.find({
      where: {
        provider_UserId,
        date: (0, _typeorm.Between)(dateStart, dateEnd)
      }
    });
    return appointments;
  }

  async findbyDate(date, provider_UserId) {
    const appointment = await this.ormRepository.findOne({
      where: {
        provider_UserId,
        date
      }
    });
    return appointment;
  }

  async create({
    date,
    user_id,
    provider_UserId
  }) {
    const appointment = this.ormRepository.create({
      date,
      user_id,
      provider_UserId
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

}

var _default = AppointmentsRepository;
exports.default = _default;