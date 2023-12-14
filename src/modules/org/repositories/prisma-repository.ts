import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';

import { OrgRepository } from './repository';

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data });

    return org;
  }

  async findManyByCityAndUf(uf: string, city: string) {
    const orgs = await prisma.org.findMany({
      where: {
        city,
        uf,
      }
    });

    return orgs;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: { email },
    });

    return org;
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: { id },
    });

    return org;
  }
}
