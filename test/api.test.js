const request = require('supertest');
const app = require('../app');

describe('GET /api', () => {
  it('deve retornar a mensagem correta', async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('API funcionando corretamente!');
  });
});
