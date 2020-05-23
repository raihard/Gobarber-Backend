// import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositores/fakes/FakeAppointmentsRepository';
import FakeCache from '@modules/Caches/fakes/FakeCache';
import ListAppointmentsServices from './ListAppointmentsServices';

describe('ListAppointmentsServices', () => {
  it('should be able to list appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date('2020-04-04T08:00'),
      user_id: '123',
      provider_UserId: '321',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date('2020-04-04T10:00'),
      user_id: '123',
      provider_UserId: '321',
    });

    const appointment3 = await fakeAppointmentsRepository.create({
      date: new Date('2020-04-04T12:00'),
      user_id: '123',
      provider_UserId: '321',
    });

    const fakeCache = new FakeCache();
    const listDayAvailability = new ListAppointmentsServices(
      fakeAppointmentsRepository,
      fakeCache,
    );

    const appointments = await listDayAvailability.execute({
      provider_UserId: '321',
      day: 4,
      month: 4,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2, appointment3]);
  });
});
