import seatME from '../database';
import { Request, Response, NextFunction } from 'express';

const sessionController : { [key: string]: (req: Request, res: Response, next:NextFunction )=> void } = {};

// sessionController.isLoggedIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const { session}
//     const sessionQuery = 'SELECT * FROM sessions WHERE cookieId = $1 LIMIT 1'
//     const sessionValues = [sessionID]
//     const sessionResult = await seatME.query(sessionQuery)
//         if (session === null) {
//             sc.res.status(401).json(false);
//         } else {
//             const user = await User.findOne({ where: { id: session.cookieId } });
//             sc.res.locals.user = user;
//             sc.next();
//          }
//     }
//     catch(err: any) {
//         sc.next({
//             log: 'Error checking if User is logged in',
//             status: 400,
//             message: { err: 'Error checking if User is logged in' }
//         })
//     };
// };

// sessionController.startSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const sessionID = res.locals.userID
//     const sessionQuery = 'SELECT * FROM sessions WHERE session_id = $1'
//     await seatME.query(sessionQuery, [sessionID], (err,result) => {
//         if (result.rows.length === 0) {
//             const sessionText = `INSERT INTO sessions (session_id) VALUES ($1)`;
//             seatME.query(sessionText, [sessionID], (err, result) => result)
//             return next()
//         } else {
//             console.log('Existing session found, continuing logging in')
//             return next()
//         }}
//     )
// }

sessionController.startSession = (req: Request, res: Response, next: NextFunction): void => {
    if (!res.locals.cookieID === res.locals.userID){
        res.locals.cookieID = res.locals.userID
        return next()
    }
    else {
        return next()
    }
}

sessionController.loggedIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (res.locals.cookieID === 0){
        res.status(401).json(false)
    }
    else {
        return next()
    }
}

sessionController.logOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.locals.cookieID = 0 
    return next()
}

export default sessionController