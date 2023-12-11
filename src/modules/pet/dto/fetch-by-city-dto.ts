import { Pet } from '@prisma/client';

export interface FetchByCityRequestDTO {
  city: string;
  uf: string;
}

export interface FetchByCityResponseDTO {
  pets: Pet[];
}
