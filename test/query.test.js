const request = require('supertest');
const app = require('../src/backend/web/app');

jest.mock('../src/backend/utils/indexer');

describe('Testing query route', () => {
  test('Testing with valid length of characters for text', async () => {
    const searchTerm = encodeURIComponent('I Love Telescope');
    const res = await request(app).get(`/query?text=${searchTerm}&filter=post`);
    expect(res.status).toBe(200);
  });

  test('Testing with invalid length of characters for text', async () => {
    // searchTerm is 257 chars long
    const searchTerm = encodeURIComponent(
      '8l4XOYWZ3SA9aevIozTcEAng3GOSCAiiDARThEkAFn2F2YtBexA3lcg1O38SGSHILQrrNYReKWOC6RM4ZQQIGqZoLSOLlbbYqlfSkIDM83aeGDYW7KU8OSLbIXUIWIF4TINwrjxi453biwyjgYsJeqFx9ORd0EIw3dMwGPWhoMbvTIxUWXV032qgPRmohLbTf8xnMyttPjIOk3rHBXpukWSnkZiKyBMsUniZZnxYPw7yIhfoaS77jIPRUuiQufDdO'
    );
    const res = await request(app).get(`/query?text=${searchTerm}&filter=post`);
    expect(searchTerm.length).toBeGreaterThan(256);
    expect(res.status).toBe(400);
  });

  test('Testing with missing text param', async () => {
    const res = await request(app).get('/query?filter=post');
    expect(res.status).toBe(400);
  });

  test('Testing with missing filter param', async () => {
    const searchTerm = encodeURIComponent('I Love Telescope');
    const res = await request(app).get(`/query?text=${searchTerm}`);
    expect(res.status).toBe(400);
  });

  test('Testing with invalid filter', async () => {
    const searchTerm = encodeURIComponent('I Love Telescope');
    const res = await request(app).get(`/query?text=${searchTerm}&filter=test`);
    expect(res.status).toBe(400);
  });

  test('Testing with valid post filter', async () => {
    const searchTerm = encodeURIComponent('I Love Telescope');
    const res = await request(app).get(`/query?text=${searchTerm}&filter=post`);
    expect(res.status).toBe(200);
  });

  test('Testing with valid author filter', async () => {
    const searchTerm = encodeURIComponent('I Love Telescope');
    const res = await request(app).get(`/query?text=${searchTerm}&filter=author`);
    expect(res.status).toBe(200);
  });

  test('Testing with empty param values', async () => {
    const res = await request(app).get(`/query?text=&filter=`);
    expect(res.status).toBe(400);
  });
});
