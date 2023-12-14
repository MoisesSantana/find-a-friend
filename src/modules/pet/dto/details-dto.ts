import { Pet } from '@prisma/client';

export interface DetailsRequestDTO {
  id: string;
}

export interface DetailsResponseDTO {
  pet: Pet;
}
