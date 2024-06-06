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

const handleDeleteStudent = (
        e:React.MouseEvent<HTMLLIElement>,
        setStudents:React.Dispatch<React.SetStateAction<Students>>,
        students:Students
    ) => {
    // console.log(e);
    const studentName:string = e.currentTarget.textContent.replace('delete', '');
    console.log('text content', studentName);
    const newStudents = [...students]
    for(let i = 0; i < newStudents.length; i++) {
        if(newStudents[i].name === studentName) {
            newStudents.splice(i, 1);
            setStudents(newStudents);
            break;
        }
    }
}


// the functional component
const StudentInput: React.FC<StudentInputProps> = ({ 
    studentCandidate,
    setStudentCandidate,
    students, 
    setStudents,
    rules
}) => {

    // hard coded 
    // const studentNames = ['Ben', 'Daniel', 'Darren', 'Myles', 'Garret'];
    const studentLIs = [];

    for(let i = 0; i < students.length; i++) {
        studentLIs.push(<li
                            className="student-li"
                            onClick={(e) => {
                                handleDeleteStudent(e, setStudents, students)
                                }}>
                        {students[i].name}
                        <span className="delete-student-text">delete</span>
                        </li>)
    }


    return (
        <div className='borderBox'>
            <h3 className='centerText'>Student names:</h3>
            <form className='centerElement'>
                <input 
                    className='student-input centerElement'
                    type="text"
                    value={studentCandidate}
                    onChange={(e) => {handleStudentCandidateChange(e, setStudentCandidate)}}
                />
                <br/>
                <br/>
                <button 
                    className='centerElement'
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