import { Students, Rules } from "../../types";

// Shape of incoming data: 
// 5x5 Array of arrays of objects; each object is a seat
// Inputs: Rules object, students
// Output: React element of array of React elements in grid

/*{
  'rule' : [
    'bobby', 'darren'
  ]
}
*/


const seatLayout = (rules: Rules, students: Students) => {
  (function (students: Students, rules: Rules) {
    // Build student seating cache
    const seating: {[key: number]: string} = {1: 'bob'}
    for (let i:number = 0; i < 25; i++){
      seating[i] = '';
    }
    if (rules) {
      // Iterate through rules object
      for (const rule in rules) {
        let student = rule
        // Check type of rule
        if (rules[rule].front) {
          
        }
      }
    }
  })(students, rules)
}