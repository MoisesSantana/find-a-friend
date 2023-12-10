import { FastifyInstance } from 'fastify';

export async function userRoutes(app: FastifyInstance) {
  app.post('/user', () => {
    console.log('post user');
  });
}
