import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import { handlers } from './handlers';
import mockStudies from './mocks/mockStudies.json';

// Define request handlers
const handlers = [
  rest.get('/mockStudies.json', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockStudies));
  }),
];

// Create and export the MSW server
export const server = setupServer(...handlers);
