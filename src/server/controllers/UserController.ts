import seatME from '../database';
import { MiddlewareTypes } from '../../types';
import { Pool, QueryResult } from 'pg';

const connectionString: string = process.env.CONNECTION_STRING

const pool = new Pool({
  connectionString,
});

const userController : { [key: string]: (uc:MiddlewareTypes)=> Promise<void> } = {};

userController.createUser = async (uc: MiddlewareTypes): Promise<void> => {
  const { email, password } : { email: string; password: string}= uc.req.body;

  if (!email || !password) {
    uc.res.status(400).json({ error: 'Missing field.' });
  }
    // const queryText = `INSERT INTO users (usr_email, usr_password) VALUES (${email}, ${password})`;
    // seatME.query(queryText)
    // .then((result: any) => {
    //   console.log(result)
    //   uc.next();
      const queryText = 'INSERT INTO users (usr_email, usr_password) VALUES ($1, $2)';
      const queryValues = [email, password];
      pool.query(queryText, queryValues)
      .then((result: QueryResult<any>) => {
        console.log(result);
        uc.next();
    })
    .catch((err: Error) => {
        uc.next({
            log: 'Error executing query',
            status: 500,
            message: { err: err.message }
        });
    });
    
};

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