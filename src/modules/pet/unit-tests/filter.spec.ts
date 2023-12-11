import { Gender } from '@prisma/client';

import { InMemoryOrgRepository } from '@/modules/org/repositories/in-memory-repository';

import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryPetRepository } from '../repositories/in-memory-repository';
import { FilterUseCase } from '../use-cases/filter';

let orgRepository: InMemoryOrgRepository;
let petRepository: InMemoryPetRepository;
let sut: FilterUseCase;

describe('[Pet] Filter', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgRepository);
    sut = new FilterUseCase(petRepository);
    
    const org1 = await orgRepository.create({
      id: 'org-id-1',
      name: 'Org Name',
      cep: '99999-999',
      address: 'Org Address',
      uf: 'RJ',
      city: 'Rio de Janeiro',
      password: 'password',
      phone: '(21) 99999-9999',
      email: 'email@email.com',
    });

    const org2 = await orgRepository.create({
      id: 'org-id-2',
      name: 'Org Name',
      cep: '99999-999',
      address: 'Org Address',
      uf: 'SP',
      city: 'São Paulo',
      password: 'password',
      phone: '(21) 99999-9999',
      email: 'email@email.com',
    });

    await petRepository.create({
      species: 'dog',
      breed: 'SRD',
      age: 1,
      gender: Gender.F,
      org_id: org1.id,
    });

    await petRepository.create({
      species: 'dog',
      breed: 'Fila Brasileiro',
      age: 0,
      gender: Gender.F,
      org_id: org1.id,
    });

    await petRepository.create({
      species: 'dog',
      breed: 'Fila Brasileiro',
      age: 5,
      gender: Gender.F,
      org_id: org1.id,
    });

    await petRepository.create({
      species: 'dog',
      breed: 'Fila Brasileiro',
      age: 5,
      gender: Gender.M,
      org_id: org1.id,
    });

    await petRepository.create({
      species: 'cat',
      breed: 'SRD',
      age: 2,
      gender: Gender.M,
      org_id: org1.id,
    });

    await petRepository.create({
      species: 'bird',
      breed: 'Trinca Ferro',
      age: 0,
      gender: Gender.M,
      org_id: org2.id,
    });
  });

  it('should be able to filter pets by city and uf', async () => {
    const { pets } = await sut.execute({
      city: 'São Paulo',
      uf: 'SP',
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([
      expect.objectContaining({ species: 'bird' }),
    ]);
  });

  it('should be able to filter pets by species', async () => {
    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
      uf: 'RJ',
      species: 'dog',
    });

    expect(pets).toHaveLength(4);
    expect(pets).toEqual([
      expect.objectContaining({ species: 'dog' }),
      expect.objectContaining({ species: 'dog' }),
      expect.objectContaining({ species: 'dog' }),
      expect.objectContaining({ species: 'dog' }),
    ]);
  });

  it('should be able to filter pets by breed', async () => {
    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
      uf: 'RJ',
      breed: 'SRD',
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ breed: 'SRD' }),
      expect.objectContaining({ breed: 'SRD' }),
    ]);
  });

  it('should be able to filter pets by gender', async () => {
    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
      uf: 'RJ',
      gender: Gender.F,
    });

    expect(pets).toHaveLength(3);
    expect(pets).toEqual([
      expect.objectContaining({ gender: Gender.F }),
      expect.objectContaining({ gender: Gender.F }),
      expect.objectContaining({ gender: Gender.F }),
    ]);
  });

  it('should be able to filter pets by age', async () => {
    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
      uf: 'RJ',
      age: 0,
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([
      expect.objectContaining({ age: 0 }),
    ]);
  });

  it('should be able to filter pets by all filters', async () => {
    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
      uf: 'RJ',
      species: 'dog',
      breed: 'Fila Brasileiro',
      gender: Gender.M,
      age: 5,
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([
      expect.objectContaining({ species: 'dog' }),
    ]);
  });
});
