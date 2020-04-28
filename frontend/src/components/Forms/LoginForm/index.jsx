// Dependencies
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

// Source
import EdicoLogo from '../../EdicoLogo';
import { useAuth } from '../../../context/auth';

// Service
import { login } from '../../../services/apiGateway';

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const { setAuthTokens } = useAuth();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setError] = useState(false);
  const onSubmit = async (data) => {
    const loginInfo = await login(data);
    if (loginInfo.status === 200) {
      await setAuthTokens(loginInfo.data);
      setLoggedIn(true);
    } else { setError(true); }
  };


  if (isLoggedIn) {
    const isSeller = JSON.parse(localStorage.getItem('tokens')).org_seller;
    if (isSeller) {
      return <Redirect to="/createcheque" />;
    }
    return <Redirect to="/cheques" />;
  }
  return (
    <div>

      <EdicoLogo />
      <form onSubmit={handleSubmit(onSubmit)}>
        {isError ? <span> Wrong username or password </span> : null}
        <input
          name="username"
          type="text"
          inputRef={register({ required: true })}
        />
        {errors.username && <span>This field is required</span>}
        <input
          name="password"
          type="password"
          inputRef={register({ required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <button type="submit">Skrá inn</button>
      </form>

    </div>
  );
};

export default LoginForm;
