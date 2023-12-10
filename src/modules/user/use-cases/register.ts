import { UserAlreadyExistsError } from '@/errors/user-already-exists-error';

import { hash } from 'bcryptjs';

import { RegisterRequestDTO, RegisterResponseDTO } from '../dto/register-dto';
import { Repository } from '../repositories/repository';

export class RegisterUserCase {
  constructor(private repository: Repository) {}

  async execute({ name, email, password }: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const userAlreadyExists = await this.repository.findByEmail(email);

    if (userAlreadyExists) throw new UserAlreadyExistsError();

    const passwordHash = await hash(password, 8);

    const user = await this.repository.create({
      name,
      email,
      password: passwordHash,
    });

    return { user };
  }
}
