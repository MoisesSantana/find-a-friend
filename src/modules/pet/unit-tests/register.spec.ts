import { Gender } from '@prisma/client';

import { ResourceNotFoundError } from '@/errors/resource-not-found-error';
import { InMemoryOrgRepository } from '@/modules/org/repositories/in-memory-repository';

import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryPetRepository } from '../repositories/in-memory-repository';
import { RegisterUseCase } from '../use-cases/register';

let petRepository: InMemoryPetRepository;
let orgRepository: InMemoryOrgRepository;
let sut: RegisterUseCase;

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
  species: 'dog',
  breed: 'SRD',
  age: 1,
  gender: Gender.F,
};

describe('[Pet] Register', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgRepository);
    sut = new RegisterUseCase(petRepository, orgRepository);

    await orgRepository.create(orgData);
  });

  it('should be able register a pet', async () => {
    const { pet } = await sut.execute({
      ...petData,
      orgId: orgData.id,
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it('should not be able to register a pet with a non-existing org', async () => {
    await expect(() => sut.execute({
      ...petData,
      orgId: 'non-existing-org-id',
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
