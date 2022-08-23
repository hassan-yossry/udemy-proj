import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('GET /api/images', (done) => {
    request
      .get('/api/images?filename=palmtunnel&&height=200&&width=400')
      .then((response) => expect(response.status).toBe(200));
    done();
  });
});
