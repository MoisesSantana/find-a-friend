import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';

import { Filter, PetRepository } from './repository';

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data });

    return pet;
  }

  async findManyByCityAndUf(uf: string, city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city,
          uf,
        }
      }
    });

    return pets;
  }

  async findManyByFilter(filter: Filter) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: filter.city,
          uf: filter.uf,
        },
        species: filter.species,
        breed: filter.breed,
        gender: filter.gender,
        age: filter.age,
      }
    });

    return pets;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    });

    return pet;
  }
}
