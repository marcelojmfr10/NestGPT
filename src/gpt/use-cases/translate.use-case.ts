import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, lang } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}:${prompt}
          `,
      },
      //   {
      //     role: 'user',
      //     content: prompt,
      //   },
    ],
    model: 'gpt-4o',
    temperature: 0.2,
    max_completion_tokens: 150,
    // response_format: {
    //   type: 'json_object',
    // },
  });

  return { message: completion.choices[0].message.content };
};
