import { Client } from 'pg';
import dotenv from 'dotenv';

// Replace with your ElephantSQL connection string
const connectionString: string = process.env.CONNECTION_STRING
// const connectionString = 'postgres://kmecqwhm:Rqj57GYzeQjTbHGlYsstDsfluEC1te9a@fanny.db.elephantsql.com/kmecqwhm'
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

