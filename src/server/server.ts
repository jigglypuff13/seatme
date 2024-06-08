import express, { Request, Response, NextFunction } from 'express';
// const path = require('path');
import path from 'path';
import userController from './controllers/UserController';
import cookieController from './controllers/CookieController';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json())

app.post('/signup', userController.createUser, cookieController.setSSIDCookie, (req: Request, res: Response) =>{
  console.log("hello",res.locals.userID)
  res.status(200).json(true);
})

app.post('/login', userController.loginUser, (req: Request, res: Response) =>{
  res.status(200).json(true);
})

app.use('/', (req: Request, res: Response) => res.sendFile(path.join(__dirname, '../client/index.html')))



// CURRENTLY NOT WORKING
// /* 404 Catch All */
// app.all('*', (req: Request, res: Response) => {
//   res.status(404).sendFile(path.join(__dirname, '../client/404.html'));
//   // res.status(404).send('404: Page Not Found');
// });
//
// // app.use((req: Request, res: Response, next: NextFunction) => {
// //   res.status(404).send('404: Page Not Found');
// // });
// // CURRENTLY NOT WORKING


/* Global Middlware Error Handling*/
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Unknown middlware error'
  }
})

app.listen(3000, () => console.log('server is listening on port 3000'));
