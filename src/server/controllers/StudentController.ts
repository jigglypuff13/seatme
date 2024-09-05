import seatMe from '../database';
import { Middleware, Students } from '../../types';
const studentController: { [key: string]: Middleware } = {

  // grab the userID and students array from the locals to make a new Student rows
  addStudents: async (req, res, next) => {

    const { userID, students } = res.locals.chartInfo

    console.log(userID, '<--- userID in StudentController');
    console.log(students, '<--- students in StudentController')

    const createStudentsQuery = (students: Students) => {

      let query = 'INSERT INTO students (stu_name, stu_users_fk) VALUES ';

      const valuesText: string = students.map((_, i) => `($${i + 1}, ${userID})`).join(', ');
      query += valuesText + ' RETURNING stu_id;';

      const valuesArr: string[] = students.map(e => e.name);

      return { query, valuesArr };
    };

    const { query, valuesArr } = createStudentsQuery(students);

    console.log(query, '<--- query');
    console.log(valuesArr, '<--- valuesArr');

    try {

      await seatMe.query(query, valuesArr, (err, result) => {
        console.log('INSIDE studentName query');

        const insertedStudents = result.rows;

        console.log(insertedStudents, '<--- insertedStudents');

        res.locals.chartInfo = { ...res.locals.chartInfo, insertedStudents };

        console.log(result, '<--- result from inside queryResult');
        if (err) {
          console.log(err, '<--- err in studentController')

          return next();
        }
      })

      // return next();

    }

    catch (error) {
      next({
        log: 'Unprocessable Entity in addStudents',
        status: 422,
        message: 'Bad query logic in addStudents'
      })
    }

    // const newStudentsQuery: string = `INSERT INTO students`



  }

};

export default studentController;
