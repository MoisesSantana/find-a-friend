import { FastifyInstance } from 'fastify';

export async function petRoutes(app: FastifyInstance) {
  app.post('/org/:orgId/pet', () => {
    console.log('register pet');
  });

  app.get('/pets', () => {
    console.log('list pets');
  });
}
