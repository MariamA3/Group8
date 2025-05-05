/// <reference types="vitest" />
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ResultsPage from '../../src/pages/ResultsPage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import mockStudies from '../mocks/mockStudies.json';
import { MemoryRouter } from 'react-router-dom';

// #########################################################
// ### Integration tests for studies & "ResultsPage.jsx" ###
// #########################################################
// Server for mock-data.
const server = setupServer(
  rest.get('/mockStudies.json', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockStudies));
  })
);

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

describe('ResultsPage Integration Test', () => {
  it('renders study cards based on fetched data', async () => {
    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );

    // Wait for at least one study title to appear
    await waitFor(() =>
      expect(screen.getByText(/Summary of/i)).toBeInTheDocument()
    );

    // Test that study names are rendered
    mockStudies.forEach((study) => {
      expect(screen.getByText(study.name)).toBeInTheDocument();
    });
  });

  it('handles API failure gracefully', async () => {
    // Override the handler to return a 500 error
    server.use(
      rest.get('/mockStudies.json', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(
      <MemoryRouter>
        <ResultsPage />
      </MemoryRouter>
    );

    // You can replace this with your actual error handling text
    await waitFor(() =>
      expect(
        screen.getByText(/error fetching studies/i)
      ).toBeInTheDocument()
    );
  });
});
