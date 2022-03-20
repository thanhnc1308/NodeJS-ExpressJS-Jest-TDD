const request = require('supertest');
const app = require('../app');

describe('GET /todos', () => {
    it('GET /todos --> array todos', async () => {
        const response = await request(app).get('/todos');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(
            expect.stringContaining('json')
        );
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    completed: expect.any(Boolean),
                }),
            ])
        );
    });
});

describe('GET /todos/:id', () => {
    it('should respond with a specific todo', async () => {
        const response = await request(app).get('/todos/1');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(
            expect.stringContaining('json')
        );
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                completed: expect.any(Boolean),
            })
        );
        expect(response.body.id).toBeDefined();
    });

    it('should respond with a status code of 404', async () => {
        const response = await request(app).get('/todos/404');
        expect(response.statusCode).toBe(404);
    });
});

describe('POST /todos', () => {
    describe('given a full todo', () => {
        it('should respond with the created todo', async () => {
            const todoName = 'study node tdd';
            const response = await request(app).post('/todos').send({
                name: todoName,
            });
            expect(response.statusCode).toBe(201);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
            expect(response.body).toEqual(
                expect.objectContaining({
                    name: todoName,
                    completed: false,
                })
            );
        });
    });

    describe('given a wrong input --> validates request body', () => {
        it('should respond with a status code of 422', async () => {
            const response = await request(app).post('/todos').send({
                name: 123,
            });
            expect(response.statusCode).toBe(422);
        });
    });
});
