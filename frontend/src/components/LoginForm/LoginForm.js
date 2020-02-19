import React from 'react';
import { useForm } from 'react-hook-form';
import { getUsers } from '../../services/userService'
import './LoginForm.css'
import Logo from '../../img/edico-logo.png'

const LoginForm = props => {
  const { register, handleSubmit, errors } = useForm();
  
  const onSubmit = data => {
    const users = getUsers();
    console.log(users);
      // Add service layer call here
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
