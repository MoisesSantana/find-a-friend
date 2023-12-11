import { Gender, Pet } from '@prisma/client';

export interface FilterRequestDTO {
  city: string;
  uf: string;
  species?: string;
  breed?: string;
  gender?: Gender;
  age?: number;
}

export interface FilterResponseDTO {
  pets: Pet[]
}
