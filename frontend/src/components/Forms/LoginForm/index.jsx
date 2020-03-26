// Dependencies
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

// Source
import EdicoLogo from '../../EdicoLogo';
import '../Forms.css';
import { useAuth } from '../../../context/auth';

// Service
import * as api from '../../../services/apiGateway';

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const { setAuthTokens } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setError] = useState(false);

  const onSubmit = async (data) => {
    const loginInfo = await api.login(data);
    if (loginInfo.status === 200) {
      await setAuthTokens(loginInfo.data);
      setLoggedIn(true);
    } else { setError(true); }
  };
  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }
  return (
    <div className="loginContainer">

      <EdicoLogo />
      <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
        {isError ? <span> Wrong username or password </span> : null}
        <input
          className="inputField"
          name="username"
          type="text"
          ref={register({ required: true })}
          placeholder="Notendanafn"
        />
        {errors.username && <span>This field is required</span>}
        <input
          className="inputField"
          name="password"
          type="password"
          ref={register({ required: true })}
          placeholder="Lykilorð"
        />
        {errors.password && <span>This field is required</span>}
        <button className="submitButton" type="submit">Skrá inn</button>
      </form>

    </div>
  );
};

export default LoginForm;
