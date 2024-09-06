import seatME from '../database';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs'

const userController: { [key: string]: (req: Request, res: Response, next: NextFunction) => Promise<void> } = {};

//Middleware for Signing In
userController.createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;
  //Conditional to check that user filled email and password text boxes
  if (!email || !password) {
    res.status(400).json({ error: 'Missing field.' });
  }
  const emailQuery = 'SELECT * FROM users WHERE usr_email = $1'
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  //Database query to check if email already exists
  // await seatME.query(emailQuery, [email], (err, result) => {
  //   //Conditional if email does not already exist
  //   if (result.rows.length === 0) {
  //     //Database query to insert new email and password into the databse
  //     const queryText = `INSERT INTO users (usr_email, usr_password) VALUES ($1, $2)`;
  //     seatME.query(queryText, [email, hashedPassword], (err, result) => result)
  //     //Database query to retrieve the latest user ID created
  //     seatME.query('SELECT MAX(usr_id) FROM users', [], (err, result) => {
  //       res.locals.userID = result.rows[0].max
  //       return next();
  //     })
  //   } else {
  //     res.status(400).json({ error: 'This email is already in use.', msg: err })
  //   }
  // })

  /** Testing new database callback **/
  try {

    const emailResult = await seatME.query2(emailQuery, [email]);
    console.log(emailResult.rows, '<--- emailResult');

    if (!emailResult.rows.length) {

      const queryText = `INSERT INTO users (usr_email, usr_password) VALUES ($1, $2) RETURNING usr_id`;
      const newUserResult = await seatME.query2(queryText, [email, hashedPassword]);

      console.log(newUserResult.rows, '<--- newUserResult');
      res.locals.userID = newUserResult.rows[0].usr_id;
      return next();
    } else {
      console.log('error at createUser')

      const error = new Error('Please use different email');
      return next(error);
    }
  }

  catch (error) {
    return next(error);
  }
}

//Middleware for Logging In
userController.loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;
  //Conditional to check if the user filled email and password text boxes
  if (!email || !password) {
    res.status(400).json({ error: 'Missing field.' });
  }
  const emailQuery = 'SELECT * FROM users WHERE usr_email = $1'
  const userResult = await seatME.query2(emailQuery, [email]);

  console.log(userResult.rows, '<---- userResult');

  if (userResult.rows.length > 0) {
    bcrypt.compare(password, userResult.rows[0].usr_password, (err, passwordResult) => {
      if (passwordResult) {
        console.log('password matched')
        res.locals.userID = userResult.rows[0].usr_id;
        return next();
      } else {
        const error = new Error('Incorrect Login Details')
        return next(error);
      }
    })
  }


  //Database query to check if email exists
  // await seatME.query(emailQuery, [email], (err, result) => {
  //
  //   // TESTING:
  //   console.log(result, '<--- result');
  //   // END TESTING.
  //
  //   if (result.rows.length !== 0) {
  //     bcrypt.compare(password, result.rows[0].usr_password, (err, passwordResult) => {
  //       //Conditional to check if the password is correct
  //       if (passwordResult) {
  //         res.locals.userID = result.rows[0].usr_id;
  //         return next()
  //       } else {
  //         return res.json({ error: 'Password is incorrect.' })
  //       }
  //     })
  //   } else {
  //     return res.status(400).json({ error: 'Username does not exist' })
  //   }
  // })
}

export default userController;
