import { Injectable } from '@nestjs/common';
import { orthographyUseCase } from './use-cases';

@Injectable()
export class GptService {
  // solo va a llamar casos de uso
  async orthographyCheck() {
    return await orthographyUseCase();
  }
}
