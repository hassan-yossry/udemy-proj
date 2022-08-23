import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { transform } from './utilities';
import {
  validateImageName,
  validateHeightWidth,
  isCached,
  updateCache
} from './utilities';

type reqParams = {
  filename: string;
  width: string;
  height: string;
};

type RequestType = Request<unknown, unknown, unknown, reqParams>;

export const validateReq = (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  const { filename, height, width } = req.query;
  try {
    validateImageName(filename as string);
    validateHeightWidth(height, width);

    return next();
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    }
  }
};

export const checkCache = (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  const { filename, height, width } = req.query;
  const val = filename + height + width;
  if (isCached(val)) {
    res.sendFile(path.join(__dirname, '/../../../cached', val + '.jpg'));
    return;
  }
  return next();
};

export const resizeUpdateCache = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  const { filename, height, width } = req.query;
  const hval = parseInt(height);
  const wval = parseInt(width);

  const val = filename + height + width;
  const input = path.resolve(
    path.join(__dirname, '/../../../images', (filename as string) + '.jpg')
  );
  const output = path.resolve(
    path.join(__dirname, '/../../../cached', val + '.jpg')
  );

  try {
    await transform(input, output, hval, wval);
    updateCache(val);
    return next();
  } catch (err) {
    console.log(err);
  }
};

export const respond = (req: RequestType, res: Response) => {
  const { filename, height, width } = req.query;
  const val = filename + height + width;
  const output = path.resolve(
    path.join(__dirname, '/../../../cached', val + '.jpg')
  );
  res.sendFile(output);
};
