import React, { useState } from 'react';

interface LoginProps extends React.HTMLAttributes<HTMLElement> {
    
}

const Login = () => {
    return (
        <div className='login-container'>
            <form className='login-form'>
                <label>E-mail:</label>
                <input 
                    className='email-input' 
                    type="text"
                    value={''}
                />
                <label>Password:</label>
                <input 
                    type='password'
                    className='password-input'
                    value={''}
                />
            </form>
        </div>
    )
}

export default Login;