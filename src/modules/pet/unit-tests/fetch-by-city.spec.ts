
import { Gender } from '@prisma/client';

import { InMemoryOrgRepository } from '@/modules/org/repositories/in-memory-repository';

import { beforeEach, describe, it, expect } from 'vitest';

import { InMemoryPetRepository } from '../repositories/in-memory-repository';
import { FetchByCityUseCase } from '../use-cases/fetch-by-city';

let orgRepository: InMemoryOrgRepository;
let petRepository: InMemoryPetRepository;
let sut: FetchByCityUseCase;

describe('[Pet] Fetch by city', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgRepository);
    sut = new FetchByCityUseCase(petRepository);
    
    const org = await orgRepository.create({
      id: 'org-id',
      name: 'Org Name',
      cep: '99999-999',
      address: 'Org Address',
      uf: 'RJ',
      city: 'Rio de Janeiro',
      password: 'password',
      phone: '(21) 99999-9999',
      email: 'email@email.com',
    });

    await petRepository.create({
      species: 'dog',
      breed: 'SRD',
      age: 1,
      gender: Gender.F,
      org_id: org.id,
    });
  });

  it('should be able to fetch pets by city', async () => {
    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
      uf: 'RJ',
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([
      expect.objectContaining({ species: 'dog' })
    ]);
  });

  it('should not be able to fetch pets if dont have pets in city', async () => {
    const { pets } = await sut.execute({
      city: 'São Paulo',
      uf: 'SP',
    });

    expect(pets).toHaveLength(0);
  });
});
