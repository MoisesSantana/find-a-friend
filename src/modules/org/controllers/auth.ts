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
    console.log(org);
  } catch (error) {
    if (error instanceof InvalidCredentialsError)
      return reply.status(401).send({ message: error.message });

    throw error;
  }

  return reply.status(200).send();
}
