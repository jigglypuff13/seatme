import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // crucial

const connectionString: string = process.env.CONNECTION_STRING

const pool = new Pool({
  connectionString,
});

export default {
  query: (text: string, params: never, callback: (err: Error, result: QueryResult<any>) => Promise<void>) => {
    return pool.query(text, params, callback);
  },
  end: () => pool.end()
};

