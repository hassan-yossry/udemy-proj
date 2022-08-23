import fs from 'fs';
import path from 'path';
import sharp, { OutputInfo } from 'sharp';
const validImages: { [key: string]: string } = {};
const cached: { [key: string]: string } = {};
const updateMapFromFolder = (
  map: { [key: string]: string },
  folder: string
) => {
  const files = fs.readdirSync(path.join(__dirname, '/../../../', folder));
  files.forEach((itm) => {
    map[path.parse(path.normalize(itm)).name] = itm;
  });
};

export const initMaps = (): void => {
  updateMapFromFolder(validImages, 'images');
  updateMapFromFolder(cached, 'cached');
};
export const validateImageName = (name: string): boolean => {
  if (validImages[name]) return true;
  throw Error('Enter a valid image name');
};

export const validateHeightWidth = (height: string, width: string): boolean => {
  const hval = parseInt(height);
  const wval = parseInt(width);
  if (isNaN(hval) || isNaN(wval))
    throw new Error('Height and width must be numbers');
  if (hval <= 0 || wval <= 0)
    throw new Error('Enter a height and width value greater than zero');
  return true;
};

export const isCached = (key: string): boolean => {
  return cached[key] ? true : false;
};
export const updateCache = (val: string): void => {
  cached[val] = val + 'jpg';
};

export const transform = (
  inp: string,
  out: string,
  h: number,
  w: number
): Promise<OutputInfo> => {
  return sharp(inp).resize(w, h).toFile(out);
};
