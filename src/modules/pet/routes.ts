import { FastifyInstance } from 'fastify';

import { details } from './controllers/details';
import { filter } from './controllers/filter';
import { register } from './controllers/register';

export async function petRoutes(app: FastifyInstance) {
  app.post('/org/:orgId/pet', register);

  app.get('/pets', filter);

  app.get('/pets/:petId', details);
}
