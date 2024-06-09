import seatMe from '../database';
import { Middleware } from '../../types';

const chartController: { [key: string]: Middleware } = {

  addNewChart: async (req, res, next) => {

    const userID = req.cookies;

    console.log(userID, '<-- cookies');

    const chartName:string = req.body[3];

    console.log(chartName, '<-- name of new classroom');

    const newClassroomQuery = `INSERT INTO charts (cht_name, cht_users_fk) VALUES ($1, $2) RETURNING *;`
    const newClassroomValues = [chartName, userID]
    let chartID: number; 
    
    // insert new chart name
    seatMe.query(newClassroomQuery, newClassroomValues, (err, result) => {
      console.log(result, '<---result');
    // chartID = result.cht_id
    })

    // select the newly made primary key of charts


    res.locals.body = {userID, chartID}

    next();
  }
}

export default chartController;
