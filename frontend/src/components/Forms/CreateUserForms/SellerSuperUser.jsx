import React from 'react';
import '../Forms.css';
import { useForm } from 'react-hook-form';

const SellerSuperUser = () => {
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
  };

  return (
    <div className="forms">
      <h1>SELLER</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="inputField"
          name="password"
          type="password"
          ref={register({ required: true })}
          placeholder="Lykilorð"
        />
        {errors.password && <span>This field is required</span>}
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
          name="username"
          type="text"
          ref={register({ required: true })}
          placeholder="Notendanafn"
        />
        {errors.username && <span>This field is required</span>}
        <input
          className="inputField"
          name="username"
          type="text"
          ref={register({ required: true })}
          placeholder="Notendanafn"
        />
        {errors.username && <span>This field is required</span>}
        <button className="submitButton" type="submit">
          Skrá starfsmann
        </button>
      </form>
    </div>
  );
};

export default SellerSuperUser;