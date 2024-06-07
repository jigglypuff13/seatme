import React, { useState } from 'react';

interface LoginProps extends React.HTMLAttributes<HTMLElement> {
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<String>>,
    password: string 
    setPassword: React.Dispatch<React.SetStateAction<String>>,
}




const Login: React.FC = (
//     {
//     email,
//     setEmail,
//     password,
//     setPassword
// }
) => {

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
            </form>
        </div>
    )
}

export default Login;