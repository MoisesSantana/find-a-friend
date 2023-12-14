import { FastifyRequest, FastifyReply } from 'fastify';

import { UserAlreadyExistError } from '@/errors/user-already-exist-error';

import { z } from 'zod';

import { makeRegisterUseCase } from '../factories/make-register-use-case';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    cep: z.string().refine((cep) => cep.length === 8, {
      message: 'CEP must have just number, total 8 digits',
    }),
    address: z.string(),
    uf: z.string().length(2),
    city: z.string(),
    password: z.string(),
    phone: z.string().refine((phone) => phone.length === 11 || phone.length === 10, {
      message: 'Phone must have just number, total 10 or 11 digits, includes DDD',
    }),
    email: z.string().email(),
  });

  const data = createOrgBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();
    registerUseCase.execute(data);
  } catch (error) {
    if (error instanceof UserAlreadyExistError)
      return reply.status(409).send({ message: error.message });

    throw error;
  }

  return reply.status(201).send();
}
