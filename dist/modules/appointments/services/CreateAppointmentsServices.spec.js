"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositores/fakes/FakeAppointmentsRepository"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositores/fakes/FakeNotificationsRepository"));

var _FakeCache = _interopRequireDefault(require("../../Caches/fakes/FakeCache"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _moment = _interopRequireDefault(require("moment"));

var _CreateAppointmentsServices = _interopRequireDefault(require("./CreateAppointmentsServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
let createAppointmentsServices;
const provider_UserId = '123412';
describe('CreateAppointments', () => {
  beforeAll(async () => {
    const fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    const fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    const fakeCache = new _FakeCache.default();
    const testNow = (0, _moment.default)('2020-04-04 10:40', 'YYYY-MM-DD HH:mm');
    _moment.default.now = jest.fn(() => testNow.valueOf());
    createAppointmentsServices = new _CreateAppointmentsServices.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCache);
  });
  it('should be able to create a new appointment', async () => {
    const parsedDate = (0, _moment.default)('2020-04-04 11:40', 'YYYY-MM-DD HH:mm').toDate();
    const appointment = await createAppointmentsServices.execute({
      parsedDate,
      loggedUser_id: '321',
      provider_UserId
    });
    expect(appointment).toHaveProperty('id');
  });
  it('should not be able to create two appointment on the same time to same provider', async () => {
    await expect(createAppointmentsServices.execute({
      parsedDate: (0, _moment.default)('2020-04-04 11:40', 'YYYY-MM-DD HH:mm').toDate(),
      loggedUser_id: '321',
      provider_UserId
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new appointment in the past', async () => {
    await expect(createAppointmentsServices.execute({
      parsedDate: (0, _moment.default)('2020-04-04 10:40', 'YYYY-MM-DD HH:mm').toDate(),
      loggedUser_id: '321',
      provider_UserId
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('you will not be able to make an appointment by yourself', async () => {
    await expect(createAppointmentsServices.execute({
      parsedDate: (0, _moment.default)('2020-04-04 15:40', 'YYYY-MM-DD HH:mm').toDate(),
      loggedUser_id: provider_UserId,
      provider_UserId
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new appointment before 8am and afetr 5pm', async () => {
    await expect(createAppointmentsServices.execute({
      parsedDate: (0, _moment.default)('2020-04-04 07:40', 'YYYY-MM-DD HH:mm').toDate(),
      loggedUser_id: '321',
      provider_UserId
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointmentsServices.execute({
      parsedDate: (0, _moment.default)('2020-04-04 18:40', 'YYYY-MM-DD HH:mm').toDate(),
      loggedUser_id: '321',
      provider_UserId
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});