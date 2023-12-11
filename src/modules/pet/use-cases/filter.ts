import { FilterRequestDTO, FilterResponseDTO } from '../dto/filter-dto';
import { PetRepository } from '../repositories/repository';

export class FilterUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(data: FilterRequestDTO): Promise<FilterResponseDTO> {
    const pets = await this.petRepository.findManyByFilter(data);

    return { pets };
  }
}
