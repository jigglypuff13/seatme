
import { Request, Response, NextFunction } from 'express';

const cookieController : { [key: string]: (req: Request, res: Response, next:NextFunction )=> Promise<void> } = {};

cookieController.setSSIDCookie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.cookie('ssid', res.locals.userID, { httpOnly: true });
    return next();
}

export default cookieController;