import { MiddlewareTypes } from "../../types";
import { Session } from ;
import { User } from ;

const sessionController : { [key: string]: (sc:MiddlewareTypes)=> Promise<void> } = {};

sessionController.isLoggedIn = async (sc: MiddlewareTypes): Promise<void> => {
    try {
        const session = await Session.findOne({ where: { cookieId: sc.req.cookies.ssid } })
        if (session === null) {
            sc.res.status(401).json(false);
        } else {
            const user = await User.findOne({ where: { id: session.cookieId } });
            sc.res.locals.user = user;
            sc.next();
         }
    }
    catch(err: any) {
        sc.next({
            log: 'Error checking if User is logged in',
            status: 400,
            message: { err: 'Error checking if User is logged in' }
        })
    };
};

export default sessionController