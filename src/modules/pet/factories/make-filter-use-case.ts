import { PrismaPetRepository } from '../repositories/prisma-repository';
import { FilterUseCase } from '../use-cases/filter';

export function makeFilterUseCase() {
  const petRepository = new PrismaPetRepository();
  const useCase = new FilterUseCase(petRepository);
  
  return useCase;
}
