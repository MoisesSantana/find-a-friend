import { FastifyInstance } from 'fastify';

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', () => {
    console.log('post orgs');
  });
}
