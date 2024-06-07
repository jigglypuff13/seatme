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

const Grid = ({rules, students}: seatLayoutProps): JSX.Element => {
  const [grid, setGrid] = useState<JSX.Element[]>()

  const shallowStudents: Student[] = [...students];
  const seatingGrid: string[] = new Array(students.length);

  // Simple randomizer algo
  const seatRandomizer = (seats: number): number => {
    const seat: number = (Math.floor(Math.random() * seats));
    if (typeof seatingGrid[seat] !== 'string') return seat;
    else return seatRandomizer(seats);
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
      const studentName: string = shallowStudents.pop().name;
      const seat: number = seatRandomizer(students.length);
      seatingGrid[seat] = studentName;
    };
    // Generate array of React elements
    const finalGrid: JSX.Element[] = seatingGrid.map((name: string) => {
      return (
        <p className="studentBox">{name}</p>
    );
  });
  // Save to state
  setGrid(finalGrid);
  console.log('Grid => ', seatingGrid)
};

const saveGrid = async (students: Students, rules: Rules, grid: JSX.Element[]): Promise<void> => {

  try {
    const response = await fetch("/saveData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([students, rules, grid]),
    });

    const result = await response.json();
    alert("Success!");
  } catch (error) {
    alert("Error saving information");
  }
}

  return (
    <div>
      { grid
        ? <div id="GridLayout"> 
          {grid} 
        </div>
        : <div className="centerElement">
          <p>Generate a layout first!</p>
        </div>
      }
      <div className="centerElement">
      <button onClick={() => gridGenerator(students, rules)}>Click to Generate Layout</button>
      <button onClick={() => saveGrid(students, rules, grid)}>Button to save in SQL</button>
      </div>
    </div>
  )
}

export default Grid;