"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _moment = _interopRequireDefault(require("moment"));

var _ICaches = _interopRequireDefault(require("../../Caches/models/ICaches"));

var _IAppointmentsRepository = _interopRequireDefault(require("../repositores/IAppointmentsRepository"));

var _INotificationsRepository = _interopRequireDefault(require("../../notifications/repositores/INotificationsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateAppointmentsServices = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('Caches')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _INotificationsRepository.default === "undefined" ? Object : _INotificationsRepository.default, typeof _ICaches.default === "undefined" ? Object : _ICaches.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateAppointmentsServices {
  constructor(appointmentsRepository, notificationsRepository, caches) {
    this.appointmentsRepository = appointmentsRepository;
    this.notificationsRepository = notificationsRepository;
    this.caches = caches;
  }

  async execute({
    parsedDate,
    loggedUser_id,
    toAnotherUser_id,
    provider_UserId
  }) {
    const startOfHourAgendamento = (0, _dateFns.startOfHour)(parsedDate);
    const dateAgendamento = (0, _moment.default)(startOfHourAgendamento);
    const availableStartTime = (0, _moment.default)(dateAgendamento).hour(8).minute(0).second(0);
    const availableEndTime = (0, _moment.default)(dateAgendamento).hour(17).minute(0).second(0);
    if (dateAgendamento < availableStartTime || dateAgendamento > availableEndTime) throw new _AppError.default('Não é permetido agendar antes das 18 ou depois da 17horas', 401);
    if (loggedUser_id === provider_UserId && !toAnotherUser_id) throw new _AppError.default('Não é permetido agendar para você mesmo!', 401); // if (dateAgendamento.isBefore(dateCurrent))
    //   throw new AppError('Não é permetido agendar no passado!', 401);

    const existAgendamento = await this.appointmentsRepository.findbyDate(startOfHourAgendamento, provider_UserId);
    if (existAgendamento) throw new _AppError.default('A agenda esta bloqueada', 401);
    const user_id = loggedUser_id === provider_UserId && toAnotherUser_id || loggedUser_id;
    const appointment = await this.appointmentsRepository.create({
      date: startOfHourAgendamento,
      user_id,
      provider_UserId
    });
    const dateFormat = dateAgendamento.format('dddd, YY [de] MMMM [de] YYYY [às] HH:mm');
    await this.notificationsRepository.create({
      recipient_id: provider_UserId,
      content: `Novo agendamento para ${dateFormat}`
    });
    const keyCache = `appointments:${provider_UserId}-${dateAgendamento.format('YYYY-MM-DD')}`;
    await this.caches.invalidate(keyCache);
    return appointment;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateAppointmentsServices;
exports.default = _default;