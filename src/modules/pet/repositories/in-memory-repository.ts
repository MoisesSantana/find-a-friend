import { Prisma, Pet, Org } from '@prisma/client';

import { InMemoryOrgRepository } from '@/modules/org/repositories/in-memory-repository';

import { randomUUID } from 'node:crypto';

import { Filter, PetRepository } from './repository';

export class InMemoryPetRepository implements PetRepository {
  public pets: Pet[] = [];
  private orgRepository: InMemoryOrgRepository;
  
  constructor(orgRepository: InMemoryOrgRepository) {
    this.orgRepository = orgRepository;
  }

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id);
    return pet ?? null;
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

  async findManyByCityAndUf(uf: string, city: string) {
    const orgs = await this.orgRepository.findManyByCityAndUf(uf, city);
    const pets = this.pets.filter((pet) => (
      orgs.some((org: Org) => org.id === pet.org_id)
    ));

    return pets;
  }

  async findManyByFilter(filter: Filter) {
    const orgs = await this.orgRepository.findManyByCityAndUf(filter.uf, filter.city);
    
    let filteredPets: Pet[] = this.pets;

    const filterByOrg = (pets: Pet[]) => (
      pets.filter((pet) => orgs.some((org: Org) => org.id === pet.org_id))
    );

    const filterBySpecies = (pets: Pet[]) => (
      filter.species ? pets.filter((pet) => pet.species === filter.species) : pets
    );

    const filterByBreed = (pets: Pet[]) => (
      filter.breed ? pets.filter((pet) => pet.breed === filter.breed) : pets
    );

    const filterByGender = (pets: Pet[]) => (
      filter.gender ? pets.filter((pet) => pet.gender === filter.gender) : pets
    );

    const filterByAge = (pets: Pet[]) => (
      filter.age !== undefined ? pets.filter((pet) => pet.age === filter.age) : pets
    );

    filteredPets = filterByOrg(filteredPets);
    filteredPets = filterBySpecies(filteredPets);
    filteredPets = filterByBreed(filteredPets);
    filteredPets = filterByGender(filteredPets);
    filteredPets = filterByAge(filteredPets);

    return filteredPets;
  }
}
