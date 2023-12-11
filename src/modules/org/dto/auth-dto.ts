import { Org } from '@prisma/client';

export interface AuthRequestDTO {
  email: string;
  password: string;
}

export interface AuthReponseDTO {
  org: Org;
}
