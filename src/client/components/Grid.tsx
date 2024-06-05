import React, { useState } from "react";
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
  const [grid, setGrid] = useState<JSX.Element[]>()

  const shallowStudents: Student[] = [...students];
  const seatingGrid: string[] = new Array(students.length);
  // Simple randomizer algo
  const seatRandomizer = (seats: number): number => {
    const seat: number = (Math.floor(Math.random() * seats));
    if (!seatingGrid[seat]) return seat;
    else seatRandomizer(seats);
  };
  const gridGenerator = (students: Students, rules: Rules): void => {
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
    // Generate array of React elements
    const finalGrid: JSX.Element[] = seatingGrid.map((name: string) => {
      return (
        <div className="studentBox">
        <p>{name}</p>
      </div>
    );
  });
  // Save to state
  setGrid(finalGrid);
};
  return (
    <div>
      { grid
        ? <div id="GridLayout"> 
          {grid} 
        </div>
        : <div>
          <p>Generate a layout first!</p>
        </div>
      }
      <div>
      <button onClick={() => gridGenerator(students, rules)}>Click to Generate Layout</button>
      </div>
    </div>
  )
}