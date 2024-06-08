import React, { useState } from 'react';
import {Students, Student, Rules} from '../../types'


// the props that are allowed to be passed into this element
interface StudentInputProps extends React.HTMLAttributes<HTMLElement> {
    students: Students;
    rules: Rules;
    setRules:React.Dispatch<React.SetStateAction<Rules>>;
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
        // e:React.MouseEvent<HTMLLIElement>,
        index:number,
        rules:Rules,
        setRules:React.Dispatch<React.SetStateAction<Rules>>,
        setStudents:React.Dispatch<React.SetStateAction<Students>>,
        students:Students
    ) => {
    console.log('index', index);
    // let studentName:string = e.currentTarget.textContent.replace('delete', '').replace('must sit at front of class', '');

    // console.log('text content', studentName);
    const newStudents = [...students];
    const newRules = {...rules};
const mustSitFront = newRules['must sit front'];

    mustSitFront.splice(mustSitFront.indexOf(students[index].name), 1);
    
    // for(let i = 0; i < newStudents.length; i++) {
    //     if(newStudents[i].name === studentName) {
            newStudents.splice(index, 1);
            setStudents(newStudents);
            setRules(newRules);
    //         break;
    //     }
    // }
}


// the functional component
const StudentInput: React.FC<StudentInputProps> = ({ 
    studentCandidate,
    setStudentCandidate,
    students, 
    setStudents,
    rules,
    setRules
}) => {

    // hard coded 
    // const studentNames = ['Ben', 'Daniel', 'Darren', 'Myles', 'Garret'];
    const studentLIs = [];

    for(let i = 0; i < students.length; i++) {

        // iterating over students
        // create checkbox
        // if rules array includes name
        // value of checkbox is true
        // else false

        const checkbox = <input 
            id={`${students[i].name}`} 
            type="checkbox" 
            value={`${rules['must sit front'].includes(students[i].name)}`}
            checked={(rules['must sit front'].includes(students[i].name))}
            onClick={(e) => {
                console.log(e);
                // const checkboxId = (e.target as HTMLInputElement).dataset.id;
                const newRules = {...rules};
                newRules['must sit front'].push(students[i].name);
                setRules(newRules);
            }}>
            </input>
        


        studentLIs.push(<li
                            className="student-li"
                            >
                        {students[i].name}
                        {checkbox}<span>must sit at front of class</span>
                        <button 
                        onClick={(e) => {
                            handleDeleteStudent(i, rules, setRules, setStudents, students)
                            }}
                        id={`${i}`} 
                        className="delete-student-text">delete</button>
                        
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
                <ul id="student-list-ul">
                    {...studentLIs}
                </ul>
            </div>
        </div>
    )
    
}

export default StudentInput;