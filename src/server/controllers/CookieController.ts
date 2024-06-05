import { MiddlewareTypes } from "../../types";

const cookieController : { [key: string]: (cc:MiddlewareTypes)=> void } = {};

cookieController.setSSIDCookie = (cc:MiddlewareTypes): void => {
    cc.res.cookie('ssid', cc.res.locals.userID, { httpOnly: true });
    return cc.next();
}

export default cookieController;