import seatMe from '../database';
import { Middleware } from '../../types';

const classroomController: { [key: string]: Middleware } = {

  addNewClassroom: async (req, res, next) => {

    const cookies = req.cookies;

    console.log(cookies, '<-- cookies');

    const { name }: { name: string } = req.body;

    console.log(name, '<-- name of new classroom');

    const newClassroomQuery: string = `INSERT INTO charts (cht_name, cht_users_fk) VALUES (${name}, ${cookies.value})`
    // seatMe.query(newClassroomQuery)

    next();
  }
}

export default classroomController;
