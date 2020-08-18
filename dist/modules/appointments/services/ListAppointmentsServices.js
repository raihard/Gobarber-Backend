"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IAppointmentsRepository = _interopRequireDefault(require("../repositores/IAppointmentsRepository"));

var _ICaches = _interopRequireDefault(require("../../Caches/models/ICaches"));

var _moment = _interopRequireDefault(require("moment"));

var _classTransformer = require("class-transformer");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListAppointmentsServices = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Caches')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _ICaches.default === "undefined" ? Object : _ICaches.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListAppointmentsServices {
  constructor(appointmentsRepository, caches) {
    this.appointmentsRepository = appointmentsRepository;
    this.caches = caches;
  }

  async execute({
    provider_UserId,
    day,
    month,
    year
  }) {
    const dateFind = (0, _moment.default)(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('YYYY-MM-DD');
    const keyCache = `appointments:${provider_UserId}-${dateFind}`; // let appointments = await this.caches.recover<Appointment[]>(keyCache);

    let appointments;

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllDayProvider({
        provider_UserId,
        day,
        month,
        year
      });
      appointments = (0, _classTransformer.classToClass)(appointments);
      await this.caches.save(keyCache, appointments);
    }

    return appointments;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = ListAppointmentsServices;
exports.default = _default;