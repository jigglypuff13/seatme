import React, { useState } from 'react';
import {Students} from '../../types'



interface StudentInputProps extends React.HTMLAttributes<HTMLElement> {
    students: Students;
    handleAddStudent:(name:string) => void;
  }
  

const StudentInput: React.FC<StudentInputProps> = ({ students }) => {

    const studentNames = ['Ben', 'Daniel', 'Darren', 'Myles', 'Garret'];
    const studentLIs = [];

    for(let i = 0; i < studentNames.length; i++) {
        studentLIs.push(<li>{studentNames[i]}</li>)
    }

    const handleClick = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('student added');
    }

    return (
        <div>
            <h3>Student names:</h3>
            <form onSubmit={handleClick}>
                <input className='student-input'/>
                <br/>
                <br/>
                <button type='submit'>Add Student</button>
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