import { InvalidCredentialsError } from '@/errors/invalid-credentials-error';

import { compare } from 'bcryptjs';

import { AuthReponseDTO, AuthRequestDTO } from '../dto/auth-dto';
import { OrgRepository } from '../repositories/repository';

export class AuthUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({ email, password }: AuthRequestDTO): Promise<AuthReponseDTO> {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) throw new InvalidCredentialsError();

    const doesPasswordMatch = await compare(password, org.password);

    if (!doesPasswordMatch) throw new InvalidCredentialsError();

    return { org };
  }
}
