import express, { Request, Response, NextFunction } from 'express';
// const path = require('path');
import path from 'path';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // crucial

const connectionString: string = process.env.CONNECTION_STRING
const client = new Pool({
  connectionString,
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to ElephantSQL database');
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
};


const app = express();

connectDB();

app.use('/', (req: Request, res: Response) => res.sendFile(path.join(__dirname, '../client/index.html')))


// CURRENTLY NOT WORKING
// /* 404 Catch All */
// app.all('*', (req: Request, res: Response) => {
//   res.status(404).sendFile(path.join(__dirname, '../client/404.html'));
//   // res.status(404).send('404: Page Not Found');
// });
//
// // app.use((req: Request, res: Response, next: NextFunction) => {
// //   res.status(404).send('404: Page Not Found');
// // });
// // CURRENTLY NOT WORKING


/* Global Middlware Error Handling*/
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Unknown middlware error'
  }
})

app.listen(3000, () => console.log('server is listening on port 3000'));
