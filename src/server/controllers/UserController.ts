import seatME from '../database';
import { MiddlewareTypes } from '../../types';
import { Pool, QueryResult } from 'pg';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const connectionString: string = process.env.CONNECTION_STRING

const pool = new Pool({
  connectionString,
});

const userController : { [key: string]: (req: Request, res: Response, next:NextFunction )=> Promise<void> } = {};

userController.createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } : { email: string; password: string}= req.body;
  console.log('PLEASE');
  console.log(req.body)
  if (!email || !password) {
    res.status(400).json({ error: 'Missing field.' });
  }
    const queryText = `INSERT INTO users (usr_email, usr_password) VALUES ($1, $2)`;
    // seatME.query(queryText)
    // .then((result: any) => {
    //   console.log(result)
    //   next();
      // const queryText = 'SELECT * FROM users';
      const queryValues:string[] = [email, password];
      const please = await pool.query(queryText, queryValues, (err: Error, result: QueryResult<any>) => console.log(err, result))
      // .then((result: QueryResult<any>) => {
      //   console.log(result);
        console.log(please)
        return next();
}
    // .catch((err: Error) => {
    //     next({
    //         log: 'Error executing query',
    //         status: 500,
    //         message: { err: err.message }
    //     });
    // });
    


// userController.checkUser = async(uc:MiddlewareTypes) => {
//     const { email } : { email: string} = uc.req.params;
//     try {
//       const client = await Pool.connect();
//       const queryText = 'SELECT COUNT (*) FROM users WHERE email = $1'
//       const queryValues = [email]
//       const result = await client.query(queryText, queryValues)
//       if (result === null) {
//         uc.res.locals.userAvailability = true;
//       } else {
//         uc.res.locals.userAvailability = false;
//       }
//       uc.next();
//     }
//     catch(err) {
//         uc.next({
//           log: 'User Check Error',
//           status: 400,
//           message: { err: 'User Check Error' },
//         });
//     }
//   };

export default userController;