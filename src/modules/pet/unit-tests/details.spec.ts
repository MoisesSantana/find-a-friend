import { Gender } from '@prisma/client';

import { InMemoryOrgRepository } from '@/modules/org/repositories/in-memory-repository';

import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryPetRepository } from '../repositories/in-memory-repository';
import { DetailsUseCase } from '../use-cases/details';

let petRepository: InMemoryPetRepository;
let orgRepository: InMemoryOrgRepository;
let sut: DetailsUseCase;

const orgData = {
  id: 'org-id',
  name: 'Org Name',
  cep: '99999-999',
  address: 'Org Address',
  uf: 'RJ',
  city: 'Rio de Janeiro',
  password: 'password',
  phone: '(21) 99999-9999',
  email: 'email@email.com',
};

const petData = {
  id: 'pet-id',
  species: 'dog',
  breed: 'SRD',
  age: 1,
  gender: Gender.F,
};

describe('[Pet] Details', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgRepository);
    sut = new DetailsUseCase(petRepository);

    await orgRepository.create(orgData);
    await petRepository.create({ ...petData, org_id: orgData.id });
  });

  it('should be able find a pet', async () => {
    const { pet } = await sut.execute({ id: petData.id });

    expect(pet.id).toEqual(expect.any(String));
  });
});
