import seatME from '../database';
import { Request, Response, NextFunction } from 'express';

const userController : { [key: string]: (req: Request, res: Response, next:NextFunction )=> Promise<void> } = {};

userController.createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } : { email: string; password: string}= req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Missing field.' });
  }
    const queryText = `INSERT INTO users (usr_email, usr_password) VALUES ($1, $2)`;
    const queryValues:string[] = [email, password];
    const please = await seatME.query(queryText, queryValues, (err, result) => console.log(err, "end of error", result, "end of result"))
    return next();
}
    


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