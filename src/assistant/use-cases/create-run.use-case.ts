import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
  const { threadId, assistantId = 'id del asistente' } = options;

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId, // instructions: esto sobreescribe las instrucciones del asistente, si se omite se usan las instrucciones por defecto del asistente
  });

  return run;
};
