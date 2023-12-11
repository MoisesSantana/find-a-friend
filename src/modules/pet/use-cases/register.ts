import { ResourceNotFoundError } from '@/errors/resource-not-found-error';

import { OrgRepository } from '../../org/repositories/repository';
import { RegisterRequestDTO, RegisterResponseDTO } from '../dto/register-dto';
import { PetRepository } from '../repositories/repository';

export class RegisterUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository
  ) {}

  async execute(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const org = await this.orgRepository.findById(data.orgId);
    
    if (!org) throw new ResourceNotFoundError();

    const pet = await this.petRepository.create({
      species: data.species,
      breed: data.breed,
      age: data.age,
      gender: data.gender,
      org_id: data.orgId,
    });

    return { pet };
  }
}
