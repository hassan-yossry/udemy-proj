import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
describe('Test endpoint responses', () => {
    it('image parameters must be specified',  (done) => {
        request.get('/api/images').then((response)=>
        expect(response.status).toBe(400))
        done()
    })

    it('all file name must be speciifed',  (done) => {
        request.get('/api/images?filename=palmtunnel').then((response)=>
        expect(response.status).toBe(400))
        request.get('/api/images?filename=palmtunnel&&height=200').then((response)=>
        expect(response.status).toBe(400))
        request.get('/api/images?filename=palmtunnel&&height=200&&width=400').then((response)=>
        expect(response.status).toBe(200))
        done()
    })

    it('amust provide valid parameters',  (done) => {
        request.get('/api/images?filename=noname&&height=200&&width=400').then((response)=>
        expect(response.status).toBe(400))
        request.get('/api/images?filename=palmtunnel&&height=20&&width=0').then((response)=>
        expect(response.status).toBe(400))
        request.get('/api/images?filename=palmtunnel&&height=-1&&width=400').then((response)=>
        expect(response.status).toBe(400))
        done()
    })

});
