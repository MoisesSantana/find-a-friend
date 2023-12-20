import { FastifyReply, FastifyRequest } from 'fastify';

import { z } from 'zod';

import { makeDetailsUseCase } from '../factories/make-details-use-case';

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const detailsPetParamsSchema = z.object({
    petId: z.string().uuid(),
  });

  const { petId } = detailsPetParamsSchema.parse(request.params);

  const detailsPetUseCase = makeDetailsUseCase();

  const pet = await detailsPetUseCase.execute({ id: petId });

  reply.status(200).send(pet);
}
