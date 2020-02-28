// Dependencies
import React from 'react';
import { useForm } from 'react-hook-form';
//Source
import './LoginForm.css'
import { forms } from '../../config'

//Service
import { checkGroups } from '../../services';

const UserForm = props => {
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

export default UserForm;
