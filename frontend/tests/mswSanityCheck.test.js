import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { beforeAll, afterEach, afterAll, test, expect } from 'vitest';

const server = setupServer(
  rest.get('/test', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'ok' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('MSW sanity check', async () => {
  const res = await fetch('/test');
  const json = await res.json();
  expect(json.message).toBe('ok');
});
