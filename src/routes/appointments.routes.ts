import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentRepository from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentRepository();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider,
  });

  return response.json(appointment);
});
export default appointmentsRouter;
