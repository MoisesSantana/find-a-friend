import { Prisma, Pet } from '@prisma/client';

import { randomUUID } from 'node:crypto';

import { PetRepository } from './repository';

export class InMemoryPetRepository implements PetRepository {
  public pets: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      ...data,
      id: data.id ?? randomUUID(),
      adopted: data.adopted ?? false,
    };

    this.pets.push(pet);
    return pet;
  }
}
