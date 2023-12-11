import { OrgAlreadyExistsError } from '@/errors/org-already-exists-error';

import { hash } from 'bcryptjs';

import { RegisterRequestDTO, RegisterResponseDTO } from '../dto/register-dto';
import { Repository } from '../repositories/repository';

export class RegisterUseCase {
  constructor(private repository: Repository) {}

  async execute(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const orgAlreadyExists = await this.repository.findByEmail(data.email);

    if (orgAlreadyExists) throw new OrgAlreadyExistsError();

    const passwordHash = await hash(data.password, 8);

    const org = await this.repository.create({
      ...data,
      password: passwordHash,
    });

    return { org };
  }
}
