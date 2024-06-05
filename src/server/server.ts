import express from 'express';
// const path = require('path');
import path from 'path';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // crucial

const connectionString: string = process.env.CONNECTION_STRING
const client = new Client({
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

app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')))

app.listen(3000, () => console.log('server is listening on port 3000'));
