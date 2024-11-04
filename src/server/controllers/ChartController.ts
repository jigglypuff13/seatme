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

      const returnedChart = await seatMe.query2(newClassroomQuery, newClassroomValues);


      const chartID = returnedChart.rows[0].cht_id;


      console.log(chartID, '<--- chartID');

      res.locals.chartInfo = { students, rules, grid, userID, chartID } // it was chartID but gonna change this to chartName
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
    console.log(res.locals.chartInfo, '<--- chartInfo in addNewChartStudents');

    const { chartID, studentIDs } = res.locals.chartInfo;

    // REFACTOR: The output any[] needs to be an interface - [{string: number, string:number}]
    const xyMaker = (studentIDArray: any[]): any[] => {

      const xy = [];
      let x = 0;
      let y = 0;

      for (let i = 0; i < studentIDArray.length; i++) {
        if (y > 4) {
          y = 0;
          x++;
        }

        xy.push({ stu_id: studentIDArray[i].stu_id, x: x, y: y });
        y++;
      }

      return xy;
    };

    const cstXYarray: any[] = xyMaker(studentIDs);


    const createChartsStudentsQuery = (stuIDXY: any[]) => {

      let query = 'INSERT INTO charts_students (cst_charts_fk, cst_students_fk, cst_x, cst_y) VALUES ';

      const valuesText: string = stuIDXY.map((_, i) => {

        const baseIndex = i * 3 + 1;
        return `(${chartID}, $${baseIndex}, $${baseIndex + 1}, $${baseIndex + 2})`
      }).join(', ');

      query += valuesText + ' RETURNING *;';

      const valuesArr: any[] = [];

      for (let i = 0; i < stuIDXY.length; i++) {
        const stuID = stuIDXY[i].stu_id;
        const x = stuIDXY[i].x;
        const y = stuIDXY[i].y;

        valuesArr.push(stuID, x, y);
      }

      return { query, valuesArr };
    }

    const { query, valuesArr } = createChartsStudentsQuery(cstXYarray);

    console.log(query, valuesArr, '<---- query for addNewChartsStudents')

    try {
      const chartsStudentsResult = await seatMe.query2(query, valuesArr);

      console.log(chartsStudentsResult, '<---- result of INSERT into charts_students');

    } catch (error) {
      console.log('addNewChartsStudents Error: ', error);
    }


    res.locals.chartInfo = { ...res.locals.chartInfo };
    return next();
  }

}
export default chartController;
