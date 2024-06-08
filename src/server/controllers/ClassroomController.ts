import seatMe from '../database';
import { Middleware } from '../../types';

const ClassroomController: { [key: string]: Middleware } = {

  addNewClassroom: async (req, res, next) => {

    const cookies = req.cookies;

    console.log(cookies, '<-- cookies');

    const { name }: { name: string } = req.body;

    console.log(name, '<-- name of new classroom');

    next();
  }
}
