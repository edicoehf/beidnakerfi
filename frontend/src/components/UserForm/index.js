// Dependencies
import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from "react-router-dom";

//Source
import './LoginForm.css'
import Logo from '../../img/edico-logo.png';
import { loginUser } from '../../actions/userAction';
import { useAuth } from "../../context/auth";
import { forms } from '../../config'

//Service
import * as api from '../../services/apiGateway';
import { checkGroups } from '../../services';

const LoginForm = props => {
  const { register, handleSubmit, errors } = useForm();


  const onSubmit = async (data) => {
    // const loginInfo = await api.login(data)
    // console.log(loginInfo)
    // if(loginInfo.status === 200){
    //   dispatch(await loginUser(loginInfo.data));
    //   await setAuthTokens(loginInfo.data);
    //   setLoggedIn(true);
    // }
    // else alert('Wrong login')

  }

  return (
    <>
    { checkGroups(forms['SuperBuyer']) ?
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
      </div> : null }

     {checkGroups(forms['SuperSeller']) ?
        <div className='form'>
          <img src={Logo} alt='logo'/>
          <form onSubmit={handleSubmit(onSubmit)}>

            <input
              name="password"
              type="password"
              ref={register({ required: true })}
              placeholder="Lykilorð"
            />
            {errors.password && <span>This field is required</span> }
            <input
              name="username"
              type="text"
              ref={register({ required: true })}
              placeholder="Notendanafn"
            />
            {errors.username && <span>This field is required</span> }
            <input
              name="username"
              type="text"
              ref={register({ required: true })}
              placeholder="Notendanafn"
            />
            {errors.username && <span>This field is required</span> }
            <input
              name="username"
              type="text"
              ref={register({ required: true })}
              placeholder="Notendanafn"
            />
            {errors.username && <span>This field is required</span> }
            <button className='btn-style' type="submit">Skrá inn</button>
          </form>
        </div> : null}
    </>

  );
};

export default LoginForm;
