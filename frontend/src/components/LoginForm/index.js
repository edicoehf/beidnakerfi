// Dependencies
import React, { useState} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";

//Source
import './LoginForm.css'
import Logo from '../../img/edico-logo.png';
import { loginUser } from '../../actions/userAction';
import { useAuth } from "../../context/auth";

//Service
import * as api from '../../services/apiGateway';

const LoginForm = props => {
  const { register, handleSubmit, errors } = useForm();
  const { setAuthTokens } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    const loginInfo = await api.login(data)
    console.log(loginInfo)
    if(loginInfo.status === 200){
      dispatch(await loginUser(loginInfo.data));
      await setAuthTokens(loginInfo.data);
      setLoggedIn(true);
    }
    else alert('Wrong login')

  }
  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }
  return (
    <div className='form'>
      <img src={Logo} alt='logo'/>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          name="username"
          type="text"
          ref={register({ required: true })}
          placeholder="Notendanafn"
        />
        {errors.username && <span>This field is required</span> }
        <input
          name="password"
          type="password"
          ref={register({ required: true })}
          placeholder="Lykilorð"
        />
        {errors.password && <span>This field is required</span> }
        <button className='btn-style' type="submit">Skrá inn</button>
      </form>
    </div>
  );
};

export default LoginForm;
