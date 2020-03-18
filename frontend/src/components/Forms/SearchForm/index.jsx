import React from 'react';
import '../Forms.css';
import { useForm } from 'react-hook-form';

const BuyerSuperUser = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async () => {
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
    <>
      <form className="searchForm" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="inputField"
          name="password"
          type="password"
          ref={register({ required: true })}
          placeholder="Leitarstrengur"
        />
        {errors.password && <span>This field is required</span>}
        <button className="submitButton" type="submit">
          Leita
        </button>
      </form>
    </>
  );
};

export default BuyerSuperUser;