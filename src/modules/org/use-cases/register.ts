import { RegisterRequestDTO, RegisterResponseDTO } from '../dto/register-dto';
import { Repository } from '../repositories/repository';

export class RegisterUseCase {
  constructor(private repository: Repository) {}

  async execute(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const org = await this.repository.create(data);

    return { org };
  }
}
