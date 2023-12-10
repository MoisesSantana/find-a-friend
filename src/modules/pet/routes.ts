import { FastifyInstance } from 'fastify';

export async function petRoutes(app: FastifyInstance) {
  app.post('/pet', () => {
    console.log('post pet');
  });
}
