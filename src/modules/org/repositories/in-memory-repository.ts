import { Org, Prisma } from '@prisma/client';

import { randomUUID } from 'crypto';

export class InMemoryRepository {
  public orgs: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      ...data,
    };

    this.orgs.push(org);
    return org;
  }
}
