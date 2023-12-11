import { InvalidCredentialsError } from '@/errors/invalid-credentials-error';

import { hash } from 'bcryptjs';

import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryOrgRepository } from '../repositories/in-memory-repository';
import { AuthUseCase } from '../use-cases/auth';

let orgRepository: InMemoryOrgRepository;
let sut: AuthUseCase;

describe('[Org] Auth', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository();
    sut = new AuthUseCase(orgRepository);

    await orgRepository.create({
      name: 'Org Name',
      cep: '00000-000',
      address: 'Org Address',
      uf: 'RJ',
      city: 'Rio de Janeiro',
      password: await hash('123456', 8),
      phone: '(21) 999999999',
      email: 'email@email.com',
    });
  });

  it('should be able to auth', async () => {
    const { org } = await sut.execute({
      email: 'email@email.com',
      password: '123456',
    });

    expect(org.id).toEqual(expect.any(String));
  });
  
  it('should not be able to auth with invalid email', async () => {
    await expect(() => sut.execute({
      email: 'invalid@email.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to auth with invalid password', async () => {
    await expect(() => sut.execute({
      email: 'email@email.com',
      password: 'invalid-password',
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
