import express, { Request, Response } from 'express';
import request from 'supertest';
import path from 'path';

const app = express();

// Route to serve index.html
app.use('/', (req: Request, res: Response) => res.sendFile(path.join(__dirname, '../client/index.html')));

describe('Root route', () => {
  it('should serve index.html file with the title SEATME', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toContain('<title>SeatMe</title>');
  });
});