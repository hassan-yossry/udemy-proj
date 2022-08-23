import { transform } from '../util/imgProc';

import fs from 'fs';
import path from 'path';

describe('test transform resolve/reject', () => {
  const out = path.join(__dirname, '../../images', 'test.jpg');
  const inp = path.join(__dirname, '../../images', 'fjord.jpg');
  if (fs.existsSync(out)) {
    fs.unlinkSync(out);
  }
  it('the transform should be resolved with output crated', async () => {
    await transform(inp, out, 200, 400);
    expect(fs.existsSync(out)).toBeTrue();
  });
});
