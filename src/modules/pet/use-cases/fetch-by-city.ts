import { FetchByCityRequestDTO, FetchByCityResponseDTO } from '../dto/fetch-by-city-dto';
import { PetRepository } from '../repositories/repository';

export class FetchByCityUseCase {
  constructor(
    private petRepository: PetRepository,
  ) {}

  async execute(data: FetchByCityRequestDTO): Promise<FetchByCityResponseDTO> {
    const pets = await this.petRepository.findManyByCityAndUf(data.uf, data.city);

    return { pets };
  }
}
