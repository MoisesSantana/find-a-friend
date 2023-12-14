import { PrismaPetRepository } from '../repositories/prisma-repository';
import { DetailsUseCase } from '../use-cases/details';

export function makeDetailsUseCase() {
  const petRepository = new PrismaPetRepository();
  const useCase = new DetailsUseCase(petRepository);

  return useCase;
}
