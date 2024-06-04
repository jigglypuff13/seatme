import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {Students, SeatProps} from '../types'
import StudentInput from './components/StudentInput'


const handleAddSudent = (name:string) => {
  console.log('student added!!');
}


const App = () => {

const [students, setStudents] = useState<Students>([]);
const [rules, setRules] = useState([])




  return (
      <div>
        <h1>SEATME</h1>
        <StudentInput students={students} handleAddStudent={handleAddSudent} />
      </div>
    );
  }
  
  const root = createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );