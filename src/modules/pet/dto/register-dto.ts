import { Gender, Pet } from '@prisma/client';

export interface RegisterRequestDTO {
  orgId: string;
  species: string;
  breed: string;
  age: number;
  gender: Gender;
}

export interface RegisterResponseDTO {
  pet: Pet;
}
