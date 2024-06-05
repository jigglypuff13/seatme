import React, { useState } from 'react';
import {Students, Student, Rules} from '../../types'


// the props that are allowed to be passed into this element
interface StudentInputProps extends React.HTMLAttributes<HTMLElement> {
    students: Students;
    rules: Rules;
    studentCandidate: string;
    setStudentCandidate: React.Dispatch<React.SetStateAction<String>>;
    setStudents:React.Dispatch<React.SetStateAction<Students>>;
}

// updates the student candidate state string
const handleStudentCandidateChange = (
    e:React.ChangeEvent<HTMLInputElement>, 
    setStudentCandidate:React.Dispatch<React.SetStateAction<String>>
  ) => {
  console.log(e.target.value);
  setStudentCandidate(e.target.value);
}

const handleDeleteStudent = (e:React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
}


// the functional component
const StudentInput: React.FC<StudentInputProps> = ({ 
    studentCandidate,
    setStudentCandidate,
    students, 
    setStudents,
    rules, 
}) => {

    // hard coded 
    // const studentNames = ['Ben', 'Daniel', 'Darren', 'Myles', 'Garret'];
    const studentLIs = [];

    for(let i = 0; i < students.length; i++) {
        studentLIs.push(<li>
                            {students[i].name}
                            <button 
                                className="delete-student"
                                onClick={(e) => {handleDeleteStudent(e)}}>
                            Delete</button>
                        </li>)
    }


    return (
        <div>
            <h3>Student names:</h3>
            <form>
                <input 
                    className='student-input'
                    type="text"
                    value={studentCandidate}
                    onChange={(e) => {handleStudentCandidateChange(e, setStudentCandidate)}}
                />
                <br/>
                <br/>
                <button 
                    type='submit'
                    onClick={(e)=>{
                        e.preventDefault();
                        console.log(studentCandidate);

                        if(studentCandidate.length > 0) {
                            
                            const newStudent:Student = {
                                id: 0,
                                name: studentCandidate
                            };
                            
                            const newStudents:Students = [...students, newStudent]
                            
                            console.log(newStudents);

                            setStudents(newStudents);
                            setStudentCandidate('');
                        }
                    }}
                >Add Student</button>
            </form>
            <div className='student-list'>
                <ul>
                    {...studentLIs}
                </ul>
            </div>
        </div>
    )
    
}

export default StudentInput;