import React from 'react';
import './LoginForm.css'

import { useAuth } from '../../context/auth';

const TestHomePage3 = props => {

  const { setAuthTokens } = useAuth();


  const logOut = () => {
    setAuthTokens();
  }

  return (
    <div className='form'>
      <h1>bara fyrir sellers</h1>
       <button onClick={logOut}>LogOut</button>
    </div>
  );
};

export default TestHomePage3;
