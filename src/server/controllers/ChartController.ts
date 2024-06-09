import seatMe from '../database';
import { Middleware, Students, Rules } from '../../types';

const chartController: { [key: string]: Middleware } = {

  addNewChart: async (req, res, next) => {

    const userID: number = req.cookies.ssid;

    console.log(userID, '<-- cookies');

    const students: Students = req.body[0];
    const rules: Rules = req.body[1];
    const grid: JSX.Element[] = req.body[2];
    const chartName: string = req.body[3];

    console.log(chartName, '<-- name of new classroom');

    const newClassroomQuery = `INSERT INTO charts (cht_name, cht_users_fk) VALUES ($1, $2) RETURNING *;`
    const newClassroomValues = [chartName, userID]
    let chartID: number;

    // insert new chart name
    try {
      seatMe.query(newClassroomQuery, newClassroomValues, (err, result) => {
        console.log(result.rows, '<---result.rows'); // [ { cht_name: 'maths', cht_users_fk: 33, cht_id: 4 } ]
        chartID = result.rows[2]; // should be cht_id

        console.log(chartID, '<--- cht_id)')
        console.log(userID, '<--- usr_id)')

        res.locals.chartInfo = { students, rules, grid, userID, chartID }
        next();
      })

    }
    catch (error) {
      next({
        log: 'Unprocessable Entity in addNewChart',
        status: 422,
        message: 'Bad query logic in addNewChart'
      })

    }

    // select the newly made primary key of charts



    next();
  }
}

export default chartController;
