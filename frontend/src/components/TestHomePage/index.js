import React from 'react';
import './LoginForm.css'

import { useSelector, useDispatch } from 'react-redux';
import * as service from '../../services'
import { useRedirect } from 'hookrouter';

const LoginForm = props => {
  const userInfo = useSelector((state) => state.user);

  const dispatch = useDispatch();
  if(service.isEmpty(userInfo)) alert('hey thu matt ekki vera herna')

  return (
    <div className='form'>
      mamma inga
    </div>
  );
};

export default LoginForm;
