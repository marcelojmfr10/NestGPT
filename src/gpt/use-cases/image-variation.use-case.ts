import * as fs from 'fs';
import OpenAI, { toFile } from 'openai';
import { downloadImageAsPng } from 'src/helpers';

interface Options {
  baseImage: string;
}

export const imageVariationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { baseImage } = options;

  const pngImagePath = await downloadImageAsPng(baseImage, true);

  const image = await toFile(fs.createReadStream(pngImagePath), null, {
    type: 'image/png',
  });

  const response = await openai.images.edit({
    model: 'dall-e-2',
    prompt: 'Cambia el estilo de la imagen',
    image: image,
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });

  const fileName = await downloadImageAsPng(response.data![0].url!);
  const url = `${process.env.SERVER_URL}/gpt/image-generator/${fileName}`;

  return {
    url,
    openAIUrl: response.data![0].url,
    revised_prompt: response.data![0].revised_prompt,
  };
};
