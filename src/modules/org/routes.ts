import { FastifyInstance } from 'fastify';

import { auth } from './controllers/auth';
import { register } from './controllers/register';

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', register);

  app.post('/session', auth);
}
