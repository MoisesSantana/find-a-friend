import { Org } from '@prisma/client';

export interface RegisterRequestDTO {
  name: string;
  cep: string;
  address: string;
  uf: string;
  city: string;
  password: string;
  phone: string;
  email: string;
}

export interface RegisterResponseDTO {
  org: Org;
}
