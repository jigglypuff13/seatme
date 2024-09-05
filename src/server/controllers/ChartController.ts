import seatMe from '../database';
import { Middleware, Students, Rules } from '../../types';

const chartController: { [key: string]: Middleware } = {

  addNewChart: async (req, res, next) => {

    const userID: number = req.cookies.ssid;

    console.log(userID, '<--- user_id');
    console.log(req.body, '<--- req.body');

    const students: Students = req.body.students;
    const rules: Rules = req.body.rules;
    const grid: JSX.Element[] = req.body.grid;
    const chartName: string = req.body.chartName;

    console.log(chartName, '<-- chartName');

    const newClassroomQuery: string = `INSERT INTO charts(cht_name, cht_users_fk) VALUES($1, $2) RETURNING *`;
    const newClassroomValues: (string | number)[] = [chartName, userID];

    // insert new chart name

    try {
      const queryResult = await seatMe.query(newClassroomQuery, newClassroomValues, (err, result) => {
        console.log('INSIDE SEATME QUERY OF ADDNEWCHART')
        // // console.log(result.rows, '<---result.rows'); // [ { cht_name: 'maths', cht_users_fk: 33, cht_id: 4 } ] // chartID = result.rows[2]; // should be cht_id

        // // console.log(result.students, '<--- students in the backend');
        // console.log(chartName, '<--- cht_id)')
        // console.log(userID, '<--- usr_id)')

        // res.locals.chartInfo = { students, rules, grid, userID, chartName } // it was chartID but gonna change this to chartName
        // return next();
      })
      console.log('begin');
      console.log(queryResult, '<--- queryResult in CharController');
      console.log(seatMe, '<--- seatMe')
      res.locals.chartInfo = { students, rules, grid, userID, chartName } // it was chartID but gonna change this to chartName
      return next();

    }
    catch (error) {
      next({
        log: 'Unprocessable Entity in addNewChart',
        status: 422,
        message: 'Bad query logic in addNewChart'
      })

    }
    // seatMe.query(newClassroomQuery, newClassroomValues, (err, result) => {
    //   if (err) {
    //     console.log(err, '<-- err');
    //     return;
    //   }
    //
    //   console.log(result.rows, '<--- rows');
    // });
    //
    // seatMe.end();
    // console.log('end');
    // // select the newly made primary key of charts
    //
    //
    //
    // next();

    seatMe.testConnection();
  },

  addNewChartsStudents: async (req, res, next) => {
    console.log(res.locals.chartInfo, '<--- chartInfo');

    return next();
  }
}

export default chartController;
