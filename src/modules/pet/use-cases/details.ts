import { ResourceNotFoundError } from '@/errors/resource-not-found-error';

import { DetailsRequestDTO, DetailsResponseDTO } from '../dto/details-dto';
import { PetRepository } from '../repositories/repository';

export class DetailsUseCase {
  constructor(
    private petRepository: PetRepository,
  ) {}

  async execute(data: DetailsRequestDTO): Promise<DetailsResponseDTO> {
    const pet = await this.petRepository.findById(data.id);
    
    if (!pet) throw new ResourceNotFoundError();

    return { pet };
  }
}
