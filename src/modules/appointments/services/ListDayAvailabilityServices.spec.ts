// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositores/fakes/FakeAppointmentsRepository';
import moment from 'moment';
import ListMonthAvailabilityServices from './ListMonthAvailabilityServices';

let listMonthAvailability: ListMonthAvailabilityServices;
describe('ListDayAvailabilityServices', () => {
  beforeAll(async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    await fakeAppointmentsRepository.create({
      date: new Date('2020-04-04T08:00'),
      provider_UserId: '321',
    });

    let dateInput = moment(`2020-05-04 08:00`, 'YYYY-MM-DD HH:mm');
    do {
      fakeAppointmentsRepository.create({
        date: dateInput.toDate(),
        provider_UserId: '321',
      });
      dateInput.add(1, 'h');
    } while (dateInput.hour() <= 17);

    dateInput = moment(`2020-05-08 08:00`, 'YYYY-MM-DD HH:mm');
    do {
      fakeAppointmentsRepository.create({
        date: dateInput.toDate(),
        provider_UserId: '321',
      });
      dateInput.add(1, 'h');
    } while (dateInput.hour() <= 17);

    await fakeAppointmentsRepository.create({
      date: new Date('2020-05-07T13:00'),
      provider_UserId: '321',
    });

    await fakeAppointmentsRepository.create({
      date: new Date('2020-06-04T08:00'),
      provider_UserId: '321',
    });

    listMonthAvailability = new ListMonthAvailabilityServices(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list all the availability the day from providers', async () => {
    const monthAvailability = await listMonthAvailability.execute({
      provider_id: '321',
      month: 5,
      year: 2020,
    });
    expect(monthAvailability).toEqual(
      expect.arrayContaining([
        { day: 3, available: false },
        { day: 4, available: true },
        { day: 5, available: false },
        { day: 6, available: false },
        { day: 7, available: false },
        { day: 8, available: true },
        { day: 9, available: false },
      ]),
    );
  });
});
