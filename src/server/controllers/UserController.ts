import { User } from ;
import { MiddlewareTypes } from '../../types';


const userController : { [key: string]: (uc:MiddlewareTypes)=> Promise<void> } = {};

userController.createUser = async (uc: MiddlewareTypes): Promise<void> => {
  const { email, password } : { email: string; password: string}= uc.req.body;

  if (!email || !password) {
    uc.res.status(400).json({ error: 'Missing field.' });
  }

  try { 
    const user = User.create({
      email,
      password,
    })
    const data = await user.save();
    uc.res.locals.user = data;
    uc.res.locals.userID = data._id.toString();
    return uc.next();
    }
    catch(err:any) {
      return uc.next({
        log: 'User Signup Error',
        status: 400,
        message: { err: 'User Signup Error' },
      });
    };
};

userController.checkUser = async(uc:MiddlewareTypes) => {
    const { email } : { email: string} = uc.req.params;
    try {
      const data = await User.findOne({ where: { email } })
      if (data === null) {
        uc.res.locals.userAvailability = true;
      } else {
        uc.res.locals.userAvailability = false;
      }
      return uc.next();
    }
    catch(err: any) {
        uc.next({
          log: 'User Check Error',
          status: 400,
          message: { err: 'User Check Error' },
        });
    }
  };

export default userController;