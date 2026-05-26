import { Body, Controller, Post } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Post('create-thread')
  async createThread() {
    return await this.assistantService.createThread();
  }

  @Post('user-question')
  async userQuestion(@Body() questionDto: QuestionDto) {
    return await this.assistantService.userQuestion(questionDto);
  }
}
