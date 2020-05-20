// import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositores/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentsServices from './CreateAppointmentsServices';

describe('CreateAppointments', () => {
  it('should be able to create a new appointment and should not be able to create two appointment on the same time to same provider', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentsServices = new CreateAppointmentsServices(
      fakeAppointmentsRepository,
    );
    const parsedDate = new Date(2020, 4, 10, 11);
    const provider_UserId = '123412';
    const appointment = await createAppointmentsServices.execute({
      parsedDate,
      user_id: '321',
      provider_UserId,
    });
    expect(appointment).toHaveProperty('id');
    expect(
      createAppointmentsServices.execute({
        parsedDate,
        user_id: '321',
        provider_UserId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
