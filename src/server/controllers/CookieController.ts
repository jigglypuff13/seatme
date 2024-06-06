import { MiddlewareTypes } from "../../types";

const cookieController : { [key: string]: (cc:MiddlewareTypes)=> Promise<void> } = {};

cookieController.setSSIDCookie = async (cc:MiddlewareTypes): Promise<void> => {
    try {
        cc.res.cookie('ssid', cc.res.locals.userID, { httpOnly: true });
        cc.next();
    }
    catch(err) {
        cc.next({
            log: 'Error setting SSID cookie',
            status: 500,
            message: { err: 'Error setting SSID cookie'}
        })
    }
}

export default cookieController;