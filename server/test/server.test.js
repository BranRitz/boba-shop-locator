const request = require('supertest');
const app = require('../index');
require('dotenv').config();

describe('GET /api/v1/boba', () => {
    test('responds with 200 and business data for valid location', async () => {
        const response = await request(app).get('/api/v1/boba?location=los-gatos');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('businesses');
        expect(Array.isArray(response.body.businesses)).toBe(true);
    });

    test('responds with 200 and business data for valid location and sort_by', async () => {
        const response = await request(app).get('/api/v1/boba?location=los-gatos&sort_by=rating');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('businesses');
        expect(Array.isArray(response.body.businesses)).toBe(true);
    });

    test('responds with 200 and business data for valid location, sort_by and page', async () => {
        const response = await request(app).get('/api/v1/boba?location=los-gatos&sort_by=rating&page=1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('businesses');
        expect(Array.isArray(response.body.businesses)).toBe(true);
    });

    test('responds with 400 for invalid location', async () => {
        const response = await request(app).get('/api/v1/boba?location=invalid');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    test('responds with 400 for invalid sort_by', async () => {
        const response = await request(app).get('/api/v1/boba?location=los-gatos&sort_by=invalid');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });


    test('responds with 400 for missing location', async () => {
        const response = await request(app).get('/api/v1/boba');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    test('responds with 400 for non numeric input', async () => {
        const response = await request(app).get('/api/v1/boba?location=los-gatos&page=abc');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});