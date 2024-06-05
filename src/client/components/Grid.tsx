import React from "react";
import { Students, Rules, Student } from "../../types";

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
interface seatLayoutProps {
  rules: Rules,
  students: Students
};

const seatLayout = ({rules, students}: seatLayoutProps): JSX.Element => {
  const shallowStudents: Student[] = [...students];
  const seatingGrid: string[] = new Array(students.length);
  // Simple randomizer algo
  const seatRandomizer = (seats: number): number => {
    const seat: number = (Math.floor(Math.random() * seats));
    if (!seatingGrid[seat]) return seat;
    else seatRandomizer(seats);
  };
  (function (students: Students, rules: Rules): void {
    // Build student seating cache
    // const seating: {[key: number]: string} = {}
    // for (let i:number = 0; i < 25; i++){
    //   seating[i] = '';
    // }
    if (rules) {
      // Iterate through rules object
      for (const rule in rules) {
        // Check type of rule
        // If rule is sit at front, iterate through value array; assign each student to one of first five seats, then remove student from shallowStudents
        if (rule === 'must sit at front') {
          for (const student of rule) {
            const studentIndex: number = students.findIndex((studentObject: Student): boolean => studentObject.name === student)
            const seat: number = seatRandomizer(5);
            seatingGrid[seat] = student;
            shallowStudents.splice(studentIndex, 1);
          };
        };
      };
    };
    // Iterate through remaining students, assign to seating array
    while(shallowStudents.length) {
      const seat: number = seatRandomizer(students.length);
      seatingGrid[seat] = shallowStudents.pop().name;
    };
  })(shallowStudents, rules);
  const finalGrid: JSX.Element[] = seatingGrid.map((name: string) => {
    return (
      <div>
        <p>{name}</p>
      </div>
    );
  });
  return (
    <div>
    { finalGrid
      ? <div id="GridLayout"> 
        {finalGrid} 
      </div>
      : <div>
        <p>Generate a layout!</p>
      </div>
    }
    </div>
  )
}