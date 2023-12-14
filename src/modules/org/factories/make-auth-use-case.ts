import { PrismaOrgRepository } from '../repositories/prisma-repository';
import { AuthUseCase } from '../use-cases/auth';

export function makeAuthUseCase() {
  const orgRepository = new PrismaOrgRepository();
  const useCase = new AuthUseCase(orgRepository);

  return useCase;
}
