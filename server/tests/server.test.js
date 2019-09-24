let app = require('../server.js');
let testServer = require('supertest');

describe('test the root path', () => {
    test('should response 200 to /logout', async () => {
        let response = await testServer(app).post('/api/user/logout');
        expect(response.statusCode).toBe(200);
    })

    test('should respond 403 when not logged in', () => {
        testServer(app).get('/api/user').then(response => {
            expect(response.statusCode).toBe(403);
        })
    })
})