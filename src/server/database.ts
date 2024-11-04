import { Pool, QueryResult, Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // crucial

const connectionString: string = process.env.CONNECTION_STRING

const pool = new Pool({
  connectionString,
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connection etasblished');
    client.release();
  } catch (error) {
    console.error('Database connection error: ', error);
  }
}

testConnection();

// export default {
//   query: (
//     text: string,
//     params: (string | number)[],
//     callback: (err: Error, result: QueryResult<any>) => void) => {
//     return pool.query(text, params, callback);
//   },
//   end: () => pool.end(),
//   testConnection
// };


/** Async/Await Version **/
export default {
  query: (
    text: string,
    params: (string | number)[],
    callback: (err: Error, result: QueryResult<any>) => void) => {
    return pool.query(text, params, callback);
  },
  query2: async (text: string, params: (string | number)[]) => {
    try {
      const result = await pool.query(text, params);
      return result;
    } catch (err) {
      console.error('Error executing query', err.stack);
      throw err;
    }
  },
  end: () => pool.end(),
  testConnection
};


/** testing different variation of above, may break some stuff **/
// query: (text: string, params: (string | number)[]): Promise<QueryResult<any>> => {
//   return new Promise((resolve, reject) => {
//     pool.query(text, params, (err, result) => {
//       if (err) {
//         return reject(err); // Reject the promise with the error
//       }
//       resolve(result); // Resolve the promise with the result
//     });
//   });
// },
// end: () => pool.end(),
// testConnection
//
/** testing ends **/
// var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

// var conString: string = process.env.CONNECTION_STRING
//
//"INSERT_YOUR_POSTGRES_URL_HERE" //Can be found in the Details page
// var client = new pg.Client(conString);
// client.connect(function (err) {
//   if (err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function (err, result) {
//     if (err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].theTime);
//     // >> output: 2018-08-23T14:02:57.117Z
//     client.end();
//   });
// });
