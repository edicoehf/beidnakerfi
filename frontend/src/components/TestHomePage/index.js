import React from 'react';
import './LoginForm.css'

import { useSelector} from 'react-redux';
import { useAuth } from '../../context/auth';

const TestHomePage = props => {

  const { setAuthTokens } = useAuth();


  const logOut = () => {
    setAuthTokens();
  }

  return (
    <div className='form'>
       <button onClick={logOut}>LogOut</button>
    </div>
  );
};

export default TestHomePage;
