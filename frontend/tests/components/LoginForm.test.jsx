// tests/integration/loginApi.test.js
import request from 'supertest';
import app from '../../src/app';
import * as userService from '../../src/services/userService';
import * as tokenService from '../../src/services/tokenService';

jest.mock('../../src/services/userService');
jest.mock('../../src/services/tokenService');

describe('POST /api/login', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Positive
  it('returns 200 and token for valid credentials', async () => {
    userService.findUser.mockResolvedValue({ id: 1, username: 'john', passwordHash: 'hashed' });
    userService.verifyPassword.mockResolvedValue(true);
    tokenService.generateToken.mockReturnValue('jwt-token');

    const res = await request(app)
      .post('/api/login')
      .send({ username: 'john', password: 'correct' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ token: 'jwt-token' });
  });

  // Negative: wrong password
  it('returns 401 for invalid password', async () => {
    userService.findUser.mockResolvedValue({ id: 1, username: 'john', passwordHash: 'hashed' });
    userService.verifyPassword.mockResolvedValue(false);

    const res = await request(app)
      .post('/api/login')
      .send({ username: 'john', password: 'wrong' });

    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/invalid credentials/i);
  });

  // Negative: missing fields
  it('returns 400 when fields missing', async () => {
    const res = await request(app).post('/api/login').send({ username: '' });
    expect(res.status).toBe(400);
  });

  // Negative: database error
  it('returns 500 if userService throws', async () => {
    userService.findUser.mockRejectedValue(new Error('DB down'));

    const res = await request(app)
      .post('/api/login')
      .send({ username: 'john', password: 'pass' });

    expect(res.status).toBe(500);
  });
});
