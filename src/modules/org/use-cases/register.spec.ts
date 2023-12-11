import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryRepository } from '../repositories/in-memory-repository';
import { RegisterUseCase } from './register';

let orgRepository: InMemoryRepository;
let sut: RegisterUseCase;

const orgData = {
  name: 'Org Name',
  address: 'Org Address',
  phone: '(21) 99999-9999',
};

describe('[Org] Register', () => {
  beforeEach(() => {
    orgRepository = new InMemoryRepository();
    sut = new RegisterUseCase(orgRepository);
  });

  it('should be able to register', async () => {
    const { org } = await sut.execute(orgData);

    expect(org.id).toEqual(expect.any(String));
  });
});
