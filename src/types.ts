import { Request, Response, NextFunction } from 'express'
import { User } from ;

interface CustomResponse extends Response {
    locals: {
      user?: User;
      userID?: string;
      userAvailability?: boolean
    };
    cookie(name: string, value: string, options?: any): this;
  }

interface ParamsDictionary {
    username: string;
}

export type SeatProps = {
    open: boolean,
    studentName: string,
    x: number,
    y: number
}

export type Student = {
    id: number,
    name: string,
    rules: any
}

export type Students = Student[]

export type MiddlewareTypes = {
    req: Request<ParamsDictionary>, 
    res: CustomResponse, 
    next: NextFunction
 }