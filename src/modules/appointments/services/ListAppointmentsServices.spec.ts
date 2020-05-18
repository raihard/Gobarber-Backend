// import IAppointmentsRepository from '@modules/appointments/repositores/IAppointmentsRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositores/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentsServices from './CreateAppointmentsServices';

describe('ListAppointmentsServices', () => {
  it('should be able to list appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentsServices = new CreateAppointmentsServices(
      fakeAppointmentsRepository,
    );
    const parsedDate = new Date(2020, 4, 10, 11);
    const provider_UserId = '123412';
    const appointment = await createAppointmentsServices.execute({
      parsedDate,
      provider_UserId,
    });
    expect(appointment).toHaveProperty('id');
    expect(
      createAppointmentsServices.execute({
        parsedDate,
        provider_UserId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
