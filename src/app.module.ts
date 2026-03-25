import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { AssistantModule } from './assistant/assistant.module';

@Module({
  imports: [ConfigModule.forRoot(), GptModule, AssistantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
