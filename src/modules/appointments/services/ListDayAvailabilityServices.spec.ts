// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositores/fakes/FakeAppointmentsRepository';
import moment from 'moment';
import ListDayAvailabilityServices from './ListDayAvailabilityServices';

let listDayAvailability: ListDayAvailabilityServices;
describe('ListDayAvailabilityServices', () => {
  beforeAll(async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    await fakeAppointmentsRepository.create({
      date: new Date('2020-04-04T08:00'),
      user_id: '123',
      provider_UserId: '321',
    });

    await fakeAppointmentsRepository.create({
      date: new Date('2020-04-04T10:00'),
      user_id: '123',
      provider_UserId: '321',
    });

    await fakeAppointmentsRepository.create({
      date: new Date('2020-04-04T12:00'),
      user_id: '123',
      provider_UserId: '321',
    });

    const testNow = moment('2020-04-04 10:40', 'YYYY-MM-DD HH:mm');
    moment.now = jest.fn(() => testNow.valueOf());

    listDayAvailability = new ListDayAvailabilityServices(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list all the availability the day from providers', async () => {
    const monthAvailability = await listDayAvailability.execute({
      provider_id: '321',
      day: 4,
      month: 4,
      year: 2020,
    });
    expect(monthAvailability).toEqual(
      expect.arrayContaining([
        { hour: 8, minute: 0, available: false },
        { hour: 9, minute: 0, available: false },
        { hour: 10, minute: 0, available: false },
        { hour: 11, minute: 0, available: true },
        { hour: 12, minute: 0, available: false },
        { hour: 13, minute: 0, available: true },
      ]),
    );
  });
});
