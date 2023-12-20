import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/middlewares/verify-jwt';

import { details } from './controllers/details';
import { filter } from './controllers/filter';
import { register } from './controllers/register';

export async function petRoutes(app: FastifyInstance) {
  app.post('/org/register/pet', { onRequest: [verifyJWT] }, register);

  app.get('/pets', filter);

  app.get('/pets/:petId', details);
}
