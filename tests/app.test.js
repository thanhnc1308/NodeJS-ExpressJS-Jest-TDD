const request = require('supertest');
const app = require('../app');

describe('Index', () => {
    it('it should work', () => {
        return request(app)
            .get('/')
            .expect(200)
            .then((response) => {
                expect(response.text).toEqual('healthy');
            });
    });
});
