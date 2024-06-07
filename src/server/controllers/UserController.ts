import seatME from '../database';
import { Request, Response, NextFunction } from 'express';

const userController : { [key: string]: (req: Request, res: Response, next:NextFunction )=> Promise<void> } = {};


//Middleware for checking if user correctly inputted an email and password in the signin component; checking if email is already in use; and for signing up with a new email and password. 
userController.createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } : { email: string; password: string}= req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Missing field.' });
  }
  const emailQuery = 'SELECT * FROM users WHERE usr_email = $1'
  const emailValue = [email]
  await seatME.query(emailQuery, [email], (err, result) => {
  if (result.rows.length === 0) {
      const queryText = `INSERT INTO users (usr_email, usr_password) VALUES ($1, $2)`;
      const queryValues:string[] = [email, password];
      seatME.query(queryText, [email, password], (err, result) => result)
      seatME.query('SELECT MAX(usr_id) FROM users', [], (err, result) => {
        res.locals.userID = result.rows[0].max
        return next();
      })
  } else {
      res.status(400).json({ error: 'This email is already in use.'})
    }
})
}

export default userController;