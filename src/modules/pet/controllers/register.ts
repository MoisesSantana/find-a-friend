import { FastifyReply, FastifyRequest } from 'fastify';

import { Gender } from '@prisma/client';

import { z } from 'zod';

import { makeRegisterUseCase } from '../factories/make-register-use-case';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerPetParamsSchema = z.object({
    orgId: z.string().uuid(),
  });
  
  const registerPetBodySchema = z.object({
    species: z.string(),
    breed: z.string(),
    age: z.number(),
    gender: z.enum([Gender.F, Gender.M]),
  });

  const data = registerPetBodySchema.parse(request.body);
  const { orgId } = registerPetParamsSchema.parse(request.params);

  const registerPetUseCase = makeRegisterUseCase();
  await registerPetUseCase.execute({ ...data, orgId });

  return reply.status(201).send();
}
