import { User } from ;
import { MiddlewareTypes } from '../../types';


const userController : { [key: string]: (uc:MiddlewareTypes)=> Promise<void> } = {};

userController.createUser = async (uc: MiddlewareTypes): Promise<void> => {
  const { email, password } : { email: string; password: string}= uc.req.body;

  if (!email || !password) {
    uc.res.status(400).json({ error: 'Missing field.' });
  }

  try { 
    const client = await Pool.connect();
    const queryText = 'INSERT INTO users (email, password) VALUES ($1, $2)';
    const queryValues = [email, password];
    const newUser = await client.query(queryText, queryValues)
    uc.res.locals.user = newUser;
    uc.res.locals.userID = newUser.id.toString();
    uc.next();
    }
    catch(err) {
      uc.next({
        log: 'User Signup Error',
        status: 400,
        message: { err: 'User Signup Error' },
      });
    };
};

userController.checkUser = async(uc:MiddlewareTypes) => {
    const { email } : { email: string} = uc.req.params;
    try {
      const client = await Pool.connect();
      const queryText = 'SELECT COUNT (*) FROM users WHERE email = $1'
      const queryValues = [email]
      const result = await client.query(queryText, queryValues)
      if (result === null) {
        uc.res.locals.userAvailability = true;
      } else {
        uc.res.locals.userAvailability = false;
      }
      uc.next();
    }
    catch(err) {
        uc.next({
          log: 'User Check Error',
          status: 400,
          message: { err: 'User Check Error' },
        });
    }
  };

export default userController;