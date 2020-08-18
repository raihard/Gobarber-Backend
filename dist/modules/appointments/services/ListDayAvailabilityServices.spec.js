"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositores/fakes/FakeAppointmentsRepository"));

var _moment = _interopRequireDefault(require("moment"));

var _ListDayAvailabilityServices = _interopRequireDefault(require("./ListDayAvailabilityServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
let listDayAvailability;
describe('ListDayAvailabilityServices', () => {
  beforeAll(async () => {
    const fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    await fakeAppointmentsRepository.create({
      date: new Date('2020-04-04T08:00'),
      user_id: '123',
      provider_UserId: '321'
    });
    await fakeAppointmentsRepository.create({
      date: new Date('2020-04-04T10:00'),
      user_id: '123',
      provider_UserId: '321'
    });
    await fakeAppointmentsRepository.create({
      date: new Date('2020-04-04T12:00'),
      user_id: '123',
      provider_UserId: '321'
    });
    const testNow = (0, _moment.default)('2020-04-04 10:40', 'YYYY-MM-DD HH:mm');
    _moment.default.now = jest.fn(() => testNow.valueOf());
    listDayAvailability = new _ListDayAvailabilityServices.default(fakeAppointmentsRepository);
  });
  it('should be able to list all the availability the day from providers', async () => {
    const monthAvailability = await listDayAvailability.execute({
      provider_id: '321',
      day: 4,
      month: 4,
      year: 2020
    });
    expect(monthAvailability).toEqual(await expect.arrayContaining([{
      hour: 8,
      minute: 0,
      available: false
    }, {
      hour: 9,
      minute: 0,
      available: false
    }, {
      hour: 10,
      minute: 0,
      available: false
    }, {
      hour: 11,
      minute: 0,
      available: true
    }, {
      hour: 12,
      minute: 0,
      available: false
    }, {
      hour: 13,
      minute: 0,
      available: true
    }, {
      hour: 18,
      minute: 0,
      available: false
    }]));
  });
});