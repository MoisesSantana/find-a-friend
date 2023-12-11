import { Org, Prisma } from '@prisma/client';

import { randomUUID } from 'crypto';

import { OrgRepository } from './repository';

export class InMemoryOrgRepository implements OrgRepository {
  public orgs: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      ...data,
    };

    this.orgs.push(org);
    return org;
  }

  async findByEmail(email: string) {
    const org = this.orgs.find((org) => org.email === email);

    return org ?? null;
  }

  async findById(id: string) {
    const org = this.orgs.find((org) => org.id === id);

    return org ?? null;
  }
}
