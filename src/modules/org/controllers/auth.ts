import { FastifyRequest, FastifyReply } from 'fastify';

import { InvalidCredentialsError } from '@/errors/invalid-credentials-error';

import { z } from 'zod';

import { makeAuthUseCase } from '../factories/make-auth-use-case';

export async function auth(request: FastifyRequest, reply: FastifyReply) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const data = authBodySchema.parse(request.body);

  try {
    const authUseCase = makeAuthUseCase();
    const { org } = await authUseCase.execute(data);

    const token = await reply.jwtSign({}, {
      sign: { sub: org.id.toString() }
    });

    const refreshToken = await reply.jwtSign({}, {
      sign: { sub: org.id.toString(), expiresIn: '7d' }
    });

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError)
      return reply.status(401).send({ message: error.message });

    throw error;
  }
}
