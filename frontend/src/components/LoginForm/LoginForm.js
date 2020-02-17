import React from 'react';
import { useForm } from 'react-hook-form';


const LoginForm = props => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => { 
      console.log(data);
      
      // Add service layer call here
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Username:</label>
      <input
        name="username"
        type="text"
        ref={register({ required: true })}
      />
       {errors.username && <span>This field is required</span> }
      <label>password:</label>
      <input
        name="password"
        type="password"
        ref={register({ required: true })}
      />
      {errors.password && <span>This field is required</span> }
      <input type="submit" />
    </form>
  );
};

export default LoginForm;
