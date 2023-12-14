import { FastifyInstance } from 'fastify';

import { register } from './controllers/register';

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', register);

  app.post('/session', () => {
    console.log('auth org');
  });
}
