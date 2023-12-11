import { OrgAlreadyExistsError } from '@/errors/org-already-exists-error';

import { hash } from 'bcryptjs';

import { RegisterRequestDTO, RegisterResponseDTO } from '../dto/register-dto';
import { OrgRepository } from '../repositories/repository';

export class RegisterUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const orgAlreadyExists = await this.orgRepository.findByEmail(data.email);

    if (orgAlreadyExists) throw new OrgAlreadyExistsError();

    const passwordHash = await hash(data.password, 8);

    const org = await this.orgRepository.create({
      ...data,
      uf: data.uf.toUpperCase(),
      city: data.city.toLowerCase(),
      password: passwordHash,
    });

    return { org };
  }
}
