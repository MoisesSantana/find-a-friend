import fastify from 'fastify';

import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';

import { orgRoutes } from '@/modules/org/routes';
import { petRoutes } from '@/modules/pet/routes';

import { env } from './env';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  }
});

app.register(fastifyCookie);

app.register(orgRoutes);
app.register(petRoutes);
