import { OrgAlreadyExistsError } from '@/errors/org-already-exists-error';

import { compare } from 'bcryptjs';

import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryRepository } from '../repositories/in-memory-repository';
import { RegisterUseCase } from './register';

let orgRepository: InMemoryRepository;
let sut: RegisterUseCase;

const orgData = {
  name: 'Org Name',
  cep: '99999-999',
  address: 'Org Address',
  uf: 'RJ',
  city: 'Rio de Janeiro',
  password: 'password',
  phone: '(21) 99999-9999',
  email: 'email@email.com'
};

describe('[Org] Register', () => {
  beforeEach(() => {
    orgRepository = new InMemoryRepository();
    sut = new RegisterUseCase(orgRepository);
  });

  it('should hash the password upon registration', async () => {
    const { org } = await sut.execute(orgData);

    const isPasswordCorrectlyHashed = await compare(
      orgData.password,
      org.password
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
    expect(org.password).not.toEqual(orgData.password);
  });

  it('should not be able to register with an already registered email', async () => {
    await sut.execute(orgData);

    await expect(() => sut.execute(orgData))
      .rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });

  it('should be able to register', async () => {
    const { org } = await sut.execute(orgData);

    expect(org.id).toEqual(expect.any(String));
  });
});
