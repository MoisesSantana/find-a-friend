import { User } from '@prisma/client';

import { randomUUID } from 'node:crypto';

import { Repository } from './repository';

export class InMemoryRepository implements Repository {
  public users: User[] = [];

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);

    return user ? user : null;
  }

  async create({ name, email, password }: User) {
    const user = {
      id: randomUUID(),
      name,
      email,
      password,
    };

    this.users.push(user);

    return user;
  }
}
