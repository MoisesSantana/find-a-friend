import { Prisma, Pet } from '@prisma/client';

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findManyByCityAndUf(uf: string, city: string): Promise<Pet[]>;
}
