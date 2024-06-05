import { User } from ;
import { MiddlewareTypes } from '../../types';


const userController : { [key: string]: (uc:MiddlewareTypes)=> void } = {};

userController.createUser = (uc: MiddlewareTypes) => {
  const { username, password, name } : { username: string; password: string; name: string}= uc.req.body;

  if (!username || !name || !password) {
    return uc.res.status(400).json({ error: 'Missing field.' });
  }

  User.create({
    username,
    password,
    name,
  })
    .then((data: User) => {
      uc.res.locals.user = data;
      uc.res.locals.userID = data._id.toString();
      return uc.next();
    })
    .catch((err:any) => {
      return uc.next({
        log: 'User Signup Error',
        status: 400,
        message: { err: 'User Signup Error' },
      });
    });
};

userController.checkUser = (uc:MiddlewareTypes) => {
    const { username } : { username: string} = uc.req.params;
    User.findOne({ username })
    .then((data: User | null) => {
      if (data === null) {
        uc.res.locals.userAvailability = true;
      } else {
        uc.res.locals.userAvailability = false;
      }
      return uc.next();
    })
    .catch((err: any) => {
        uc.next({
          log: 'User Check Error',
          status: 400,
          message: { err: 'User Check Error' },
        });
    })
  };

export default userController;