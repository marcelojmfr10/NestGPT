import * as fs from 'fs';
import * as path from 'path';
import OpenAI, { toFile } from 'openai';
import { downloadBase64ImageAsPng, downloadImageAsPng } from 'src/helpers';

interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt, originalImage, maskImage } = options;

  if (!originalImage || !maskImage) {
    const response = await openai.images.generate({
      prompt,
      model: 'dall-e-3',
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      response_format: 'url',
    });

    const fileName = await downloadImageAsPng(response.data![0].url!);
    const url = `${process.env.SERVER_URL}/gpt/image-generator/${fileName}`;
    return {
      url,
      openAIUrl: response.data![0].url,
      revised_prompt: response.data![0].revised_prompt,
    };
  }

  const pngImagePath = await downloadImageAsPng(originalImage, true);
  const maskPath = await downloadBase64ImageAsPng(maskImage, true);

  const imageFile = await toFile(fs.createReadStream(pngImagePath), null, {
    type: 'image/png',
  });

  const maskFile = await toFile(fs.createReadStream(maskPath), null, {
    type: 'image/png',
  });

  const response = await openai.images.edit({
    model: 'dall-e-2',
    prompt,
    image: imageFile,
    mask: maskFile,
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
