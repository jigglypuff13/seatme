import { Client } from 'pg';
// import * as dotenv from 'dotenv';
import dotenv from 'dotenv';

dotenv.config();

// Replace with your ElephantSQL connection string
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

connectDB();


// import { Pool } from 'pg';
//
// // import * as dotenv from 'dotenv';
// import 'dotenv/config';
//
// // dotenv.config();
//
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });
//
// pool.on('connect', () => {
//   console.log('Connected to the db');
// });
//
// export default {
//   query: (text: string, params: any) => pool.query(text, params),
// };
