import { Org } from '@prisma/client';

export interface RegisterRequestDTO {
  name: string;
  address: string;
  phone: string;
}

export interface RegisterResponseDTO {
  org: Org;
}
