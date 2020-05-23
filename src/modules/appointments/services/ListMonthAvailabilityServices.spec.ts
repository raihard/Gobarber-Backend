// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositores/fakes/FakeAppointmentsRepository';
import moment from 'moment';
import ListMonthAvailabilityServices from './ListMonthAvailabilityServices';

let listMonthAvailability: ListMonthAvailabilityServices;
describe('ListMonthAvailabilityServices', () => {
  beforeAll(async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    await fakeAppointmentsRepository.create({
      date: new Date('2020-04-04T08:00'),
      user_id: '123',
      provider_UserId: '321',
    });

    let dateInput = moment(`2020-05-04 08:00`, 'YYYY-MM-DD HH:mm');
    do {
      fakeAppointmentsRepository.create({
        date: dateInput.toDate(),
        user_id: '123',
        provider_UserId: '321',
      });
      dateInput.add(1, 'h');
    } while (dateInput.hour() <= 17);

    dateInput = moment(`2020-05-08 08:00`, 'YYYY-MM-DD HH:mm');
    do {
      fakeAppointmentsRepository.create({
        date: dateInput.toDate(),
        user_id: '123',
        provider_UserId: '321',
      });
      dateInput.add(1, 'h');
    } while (dateInput.hour() <= 17);

    await fakeAppointmentsRepository.create({
      date: new Date('2020-05-07T13:00'),
      user_id: '123',
      provider_UserId: '321',
    });

    await fakeAppointmentsRepository.create({
      date: new Date('2020-06-04T08:00'),
      user_id: '123',
      provider_UserId: '321',
    });

    listMonthAvailability = new ListMonthAvailabilityServices(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list all the availability the month from providers', async () => {
    const monthAvailability = await listMonthAvailability.execute({
      provider_id: '321',
      month: 5,
      year: 2020,
    });
    expect(monthAvailability).toEqual(
      await expect.arrayContaining([
        { day: 3, available: true },
        { day: 4, available: false },
        { day: 5, available: true },
        { day: 6, available: true },
        { day: 7, available: true },
        { day: 8, available: false },
        { day: 9, available: true },
      ]),
    );
  });
});
