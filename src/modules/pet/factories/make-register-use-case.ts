import { PrismaOrgRepository } from '@/modules/org/repositories/prisma-repository';

import { PrismaPetRepository } from '../repositories/prisma-repository';
import { RegisterUseCase } from '../use-cases/register';

export function makeRegisterUseCase() {
  const petRepository = new PrismaPetRepository();
  const orgRepository = new PrismaOrgRepository();
  const useCase = new RegisterUseCase(petRepository, orgRepository);

  return useCase;
}
