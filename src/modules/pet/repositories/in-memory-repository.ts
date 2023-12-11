import { Prisma, Pet, Org } from '@prisma/client';

import { InMemoryOrgRepository } from '@/modules/org/repositories/in-memory-repository';

import { randomUUID } from 'node:crypto';

import { PetRepository } from './repository';

export class InMemoryPetRepository implements PetRepository {
  public pets: Pet[] = [];
  private orgRepository: InMemoryOrgRepository;
  
  constructor(orgRepository: InMemoryOrgRepository) {
    this.orgRepository = orgRepository;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      ...data,
      id: data.id ?? randomUUID(),
      adopted: data.adopted ?? false,
    };

    this.pets.push(pet);
    return pet;
  }

  async findManyByCityAndUf(city: string, uf: string) {
    const orgs = await this.orgRepository.findManyByCityAndUf(city, uf);
    const pets = this.pets.filter((pet) => {
      return (
        orgs.some((org: Org) => org.id === pet.org_id)
      );
    });

    return pets;
  }
}
