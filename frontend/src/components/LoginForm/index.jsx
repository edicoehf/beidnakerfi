// Dependencies
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

// Source
import './LoginForm.css';
import Logo from '../../img/edico-logo.png';
import { useAuth } from '../../context/auth';

// Service
import * as api from '../../services/apiGateway';

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
    return <Redirect to="/main" />;
  }
  return (
    <div className="form">
      <img src={Logo} alt="logo" />

      <form onSubmit={handleSubmit(onSubmit)}>
        {isError ? <span> Wrong username or password </span> : null}
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
        <button className="btn-style" type="submit">Skrá inn</button>
      </form>

    </div>
  );
};

export default LoginForm;