import { User } from '@prisma/client';

export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponseDTO {
  user: User;
}
