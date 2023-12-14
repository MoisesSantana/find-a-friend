import { FastifyInstance } from 'fastify';

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', () => {
    console.log('create org');
  });

  app.post('/session', () => {
    console.log('auth org');
  });
}
