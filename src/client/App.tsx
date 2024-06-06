import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {Students, Rules, SeatProps} from '../types'
import StudentInput from './components/StudentInput'
import Grid from './components/Grid';


const App = () => {

const [studentCandidate, setStudentCandidate] = useState('');
const [students, setStudents] = useState<Students>([]);
const [rules, setRules] = useState<Rules>({
    'must sit front': []
  }
);



  return (
      <div>
        <h1>SEATME</h1>
        <div id='appGrid'>
          <Grid 
            rules={rules}
            students={students}
            />
          <StudentInput 
            studentCandidate={studentCandidate}
            setStudentCandidate={setStudentCandidate}
            students={students} 
            setStudents={setStudents}
            rules={rules}
            />
          </div>
      </div>
    );
  }
  
  const root = createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );