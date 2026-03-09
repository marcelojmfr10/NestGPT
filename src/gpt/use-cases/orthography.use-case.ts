import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
        Las palabras usadas deben de existir en el diccionario de la Real Academia Española,
         Debes de responder en formato JSON, y no colocar la palabra json como tal, 
          tu tarea es corregirlos y retornar información soluciones, también debes de dar un porcentaje de acierto
          por el usuario, Si no hay errores, debes de retornar un mensaje de felicitaciones
          
          Ejemplo de salida: 
          {
            userScore: number,
            errors: string[], // ['error -> solución']
            message: string, // usa emojis y texto para felicitar al usuario
          }
          `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.3,
    max_completion_tokens: 150,
    response_format: {
      type: 'json_object',
    },
  });

  const jsonResponse = JSON.parse(completion.choices[0].message.content!);

  return jsonResponse;
};
