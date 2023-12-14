import { PrismaOrgRepository } from '../repositories/prisma-repository';
import { RegisterUseCase } from '../use-cases/register';

export function makeRegisterUseCase() {
  const orgRepository = new PrismaOrgRepository();
  const useCase = new RegisterUseCase(orgRepository);

  return useCase;
}
