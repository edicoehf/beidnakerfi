import React from 'react';
import './LoginForm.css'

import { useAuth } from '../../context/auth';

const TestHomePage2 = props => {

  const { setAuthTokens } = useAuth();

  const logOut = () => {
    setAuthTokens();
  }

  return (
    <div className='form'>
    <h1>bara fyrir buyers</h1>
       <button onClick={logOut}>LogOut</button>
    </div>
  );
};

export default TestHomePage2;
