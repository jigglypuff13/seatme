
// import { Session } from ;
// import { User } from ;

// const sessionController : { [key: string]: (sc:MiddlewareTypes)=> Promise<void> } = {};

// sessionController.isLoggedIn = async (sc: MiddlewareTypes): Promise<void> => {
//     let client
//     const sessionID = sc.req.cookies.ssid
//     try {
//         client = await pool.connect()
//         const sessionQuery = 'SELECT * FROM sessions WHERE cookieId = $1 LIMIT 1'
//         const sessionResult = await client.query(sessionQuery, [sessionID])
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

// sessionController.startSession = async (sc: MiddlewareTypes): Promise<void> => {
//     let client
//     const userID = sc.res.locals.userID
//     try {
//         client = await pool.connect()
//         const sessionQuery = 'SELECT * FROM sessions WHERE cookieID = $1',
//         const sessionResult = await client.query(sessionQuery, [userID])
//         if (!sessionResult) {
//             const insertQuery = 'INSERT INTO sessions (cookieId) VALUES ($1) RETURNING *';
//             const insertResult = await client.query(insertQuery, [userID])
//             console.log('New session created : ', insertResult.rows[0])
//         }
//         else {
//             console.log('Existing session found, continuing logging in')
//         }
//         sc.next();
//     }
//     catch (err: any){
//         sc.next({
//             log: 'Error in starting session',
//             status: 500,
//             message: { err: 'Error when finding or creating session'}
//         })
//     }
//     finally {
//         if (client) {
//             client.release()
//         }
//     }
// }

// export default sessionController