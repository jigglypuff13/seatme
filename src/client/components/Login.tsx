import React, { useState } from 'react';
import { LoginOrSignupPath } from '../../types';

const handleLoginOrSignup = (
    path:LoginOrSignupPath, 
    email:string,
    setEmail:React.Dispatch<React.SetStateAction<String>>,
    password:string,
    setPassword:React.Dispatch<React.SetStateAction<String>>
) => {
    
    console.log('post to ', path);
    setEmail('');
    setPassword('');

    /*
    fetch(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    // .then(res => res.json)
    .then(res => {

        const json = res.json();
        console.log(json);
        setEmail('');
        setPassword('');
    })
    .catch(err => {
        console.log(err);
    })
    */
}


const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <div className='login-container'>
            <form className='login-form'>
                <label>E-mail:</label>
                <input 
                    className='email-input' 
                    type="text"
                    onChange={(e)=> {
                        setEmail(e.target.value);
                    }}
                    value={email}
                />
                <label>Password:</label>
                <input 
                    type='password'
                    className='password-input'
                    onChange={(e)=> {
                        setPassword(e.target.value);
                    }}
                    value={password}
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleLoginOrSignup(
                        '/login', 
                        email,
                        setEmail,
                        password,
                        setPassword
                        )}}
                >Log in</button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleLoginOrSignup(
                        '/signup', 
                        email,
                        setEmail,
                        password,
                        setPassword
                        )}}
                >Sign up</button>
            </form>
        </div>
    )
}

export default Login;