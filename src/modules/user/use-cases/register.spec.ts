import { UserAlreadyExistsError } from '@/errors/user-already-exists-error';

import { compare } from 'bcryptjs';

import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryRepository } from '../repositories/in-memory-repository';
import { RegisterUserCase } from './register';

let repository: InMemoryRepository;
let sut: RegisterUserCase;

const userData = {
  name: 'Name',
  email: 'email@email.com',
  password: 'password',
};

describe('[User] Register', () => {
  beforeEach(() => {
    repository = new InMemoryRepository();
    sut = new RegisterUserCase(repository);
  });

  it('should be able to register', async () => {
    const { user } = await sut.execute(userData);

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to register with an existing email', async () => {
    await sut.execute(userData);

    await expect(() => sut.execute(userData))
      .rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute(userData);

    const isPasswordHashed = await compare(userData.password, user.password);

    expect(isPasswordHashed).toBe(true);
  });
});
