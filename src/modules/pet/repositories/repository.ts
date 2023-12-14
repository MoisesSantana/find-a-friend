import { Prisma, Pet, Gender } from '@prisma/client';

export interface Filter {
  city: string;
  uf: string;
  species?: string;
  breed?: string;
  gender?: Gender;
  age?: number;
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findManyByCityAndUf(uf: string, city: string): Promise<Pet[]>;
  findManyByFilter(filter: Filter): Promise<Pet[]>;
  findById(id: string): Promise<Pet | null>;
}
