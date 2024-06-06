import express, { Request, Response, NextFunction } from 'express';

import request from 'supertest';
const app = express();

// The middleware function you want to test
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Unknown middleware error'
  };
  // Add any additional logic or error handling here
});

describe('Middleware', () => {
  it('should handle unknown errors', async () => {
    // Create a mock error
    const mockError = new Error('Mock error');

    // Mock the next function to capture the error
    const nextMock = jest.fn();

    // Call the middleware with the mock error, request, response, and next function
    await app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        next(mockError);
      }
    );

    // Check if the next function was called with the expected error
    expect(nextMock).toHaveBeenCalledWith(mockError);
  });
});