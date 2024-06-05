import { MiddlewareTypes } from "../../types";
import { Session } from ;
import { User } from ;

const sessionController : { [key: string]: (sc:MiddlewareTypes)=> void } = {};

sessionController.isLoggedIn = (sc: MiddlewareTypes) => {
    Session.findOne({ cookieId: sc.req.cookies.ssid })
        .then((session: { cookieId: string; }) => {
            if (session === null) {
                return sc.res.status(401).json(false);
            } else {
                User.findOne({ _id: session.cookieId })
                    .then((user: string) => {
                        sc.res.locals.user = user;
                        return sc.next();
                    })
            }
        })
        .catch((err: any) => {
            return sc.next({
                log: 'Error checking if User is logged in',
                status: 400,
                message: { err: 'Error checking if User is logged in' }
            })
        });
};

export default sessionController