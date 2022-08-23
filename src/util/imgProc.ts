import sharp, { OutputInfo } from 'sharp';

export const transform = (
  inp: string,
  out: string,
  h: number,
  w: number
): Promise<OutputInfo> => {
  return sharp(inp).resize(w, h).toFile(out);
};
