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

export default connectDB;
