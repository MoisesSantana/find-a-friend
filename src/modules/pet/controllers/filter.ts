import { FastifyReply, FastifyRequest } from 'fastify';

import { Gender } from '@prisma/client';

import { z } from 'zod';

import { makeFilterUseCase } from '../factories/make-filter-use-case';

export async function filter(request: FastifyRequest, reply: FastifyReply) {
  const filterPetQuerySchema = z.object({
    city: z.string(),
    uf: z.string().max(2).min(2),
    species: z.string().optional(),
    breed: z.string().optional(),
    gender: z.enum([Gender.M, Gender.F]).optional(),
    age: z.coerce.number().optional(),
  });

  const data = filterPetQuerySchema.parse(request.query);

  const filterPetsUseCase = makeFilterUseCase();

  const pets = await filterPetsUseCase.execute(data);

  return reply.status(200).send(pets);
}
