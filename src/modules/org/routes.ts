import { FastifyInstance } from 'fastify';

import { auth } from './controllers/auth';
import { refresh } from './controllers/refresh';
import { register } from './controllers/register';

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', register);

  app.patch('/token/refresh', refresh);

  app.post('/session', auth);
}
