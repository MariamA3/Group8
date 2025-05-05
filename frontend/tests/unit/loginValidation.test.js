// tests/unit/loginValidation.test.js
import { validateCredentials } from '../../src/utils/loginValidation';

describe('validateCredentials()', () => {
  // Positive
  test('accepts normal credentials', () => {
    expect(validateCredentials('john.doe', 'S3cr3t!')).toBe(true);
  });

  // Boundary: username length = 3
  test('accepts username of length 3', () => {
    expect(validateCredentials('abc', 'password123')).toBe(true);
  });
  // Boundary: username length = 30
  test('accepts username of length 30', () => {
    const longUser = 'a'.repeat(30);
    expect(validateCredentials(longUser, 'password123')).toBe(true);
  });

  // Edge: empty
  test('rejects empty username/password', () => {
    expect(validateCredentials('', '')).toBe(false);
  });
  // Edge: extremely long username
  test('rejects username longer than 30 chars', () => {
    const tooLong = 'a'.repeat(256);
    expect(validateCredentials(tooLong, 'pass')).toBe(false);
  });

  // Negative: null/undefined
  test('rejects null inputs', () => {
    expect(validateCredentials(null, null)).toBe(false);
    expect(validateCredentials(undefined, 'pass')).toBe(false);
  });

  // Negative: illegal characters
  test('rejects username with spaces', () => {
    expect(validateCredentials('john doe', 'password')).toBe(false);
  });
});
