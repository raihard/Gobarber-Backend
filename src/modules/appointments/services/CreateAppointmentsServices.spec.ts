// import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositores/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositores/fakes/FakeNotificationsRepository';
import FakeCache from '@modules/Caches/fakes/FakeCache';

import AppError from '@shared/errors/AppError';
import moment from 'moment';
import CreateAppointmentsServices from './CreateAppointmentsServices';

let createAppointmentsServices: CreateAppointmentsServices;

const provider_UserId = '123412';
describe('CreateAppointments', () => {
  beforeAll(async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeNotificationsRepository = new FakeNotificationsRepository();
    const fakeCache = new FakeCache();

    const testNow = moment('2020-04-04 10:40', 'YYYY-MM-DD HH:mm');
    moment.now = jest.fn(() => testNow.valueOf());

    createAppointmentsServices = new CreateAppointmentsServices(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCache,
    );
  });
  it('should be able to create a new appointment', async () => {
    const parsedDate = moment('2020-04-04 11:40', 'YYYY-MM-DD HH:mm').toDate();
    const appointment = await createAppointmentsServices.execute({
      parsedDate,
      loggedUser_id: '321',
      provider_UserId,
    });
    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointment on the same time to same provider', async () => {
    await expect(
      createAppointmentsServices.execute({
        parsedDate: moment('2020-04-04 11:40', 'YYYY-MM-DD HH:mm').toDate(),
        loggedUser_id: '321',
        provider_UserId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment in the past', async () => {
    await expect(
      createAppointmentsServices.execute({
        parsedDate: moment('2020-04-04 10:40', 'YYYY-MM-DD HH:mm').toDate(),
        loggedUser_id: '321',
        provider_UserId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('you will not be able to make an appointment by yourself', async () => {
    await expect(
      createAppointmentsServices.execute({
        parsedDate: moment('2020-04-04 15:40', 'YYYY-MM-DD HH:mm').toDate(),
        loggedUser_id: provider_UserId,
        provider_UserId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new appointment before 8am and afetr 5pm', async () => {
    await expect(
      createAppointmentsServices.execute({
        parsedDate: moment('2020-04-04 07:40', 'YYYY-MM-DD HH:mm').toDate(),
        loggedUser_id: '321',
        provider_UserId,
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createAppointmentsServices.execute({
        parsedDate: moment('2020-04-04 18:40', 'YYYY-MM-DD HH:mm').toDate(),
        loggedUser_id: '321',
        provider_UserId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
