import { Prisma, Org } from '@prisma/client';

export interface Repository {
  create(data: Prisma.OrgCreateInput): Promise<Org>;
}
