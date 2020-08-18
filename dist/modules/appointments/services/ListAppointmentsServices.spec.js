"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositores/fakes/FakeAppointmentsRepository"));

var _FakeCache = _interopRequireDefault(require("../../Caches/fakes/FakeCache"));

var _ListAppointmentsServices = _interopRequireDefault(require("./ListAppointmentsServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
describe('ListAppointmentsServices', () => {
  it('should be able to list appointment', async () => {
    const fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date('2020-04-04T08:00'),
      user_id: '123',
      provider_UserId: '321'
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date('2020-04-04T10:00'),
      user_id: '123',
      provider_UserId: '321'
    });
    const appointment3 = await fakeAppointmentsRepository.create({
      date: new Date('2020-04-04T12:00'),
      user_id: '123',
      provider_UserId: '321'
    });
    const fakeCache = new _FakeCache.default();
    const listDayAvailability = new _ListAppointmentsServices.default(fakeAppointmentsRepository, fakeCache);
    const appointments = await listDayAvailability.execute({
      provider_UserId: '321',
      day: 4,
      month: 4,
      year: 2020
    });
    expect(appointments).toEqual([appointment1, appointment2, appointment3]);
  });
});