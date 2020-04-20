import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getUser } from '../../../services/apiGateway';
import '../Forms.css';

const UserDetailsForm = (props) => {
  const { handleSubmit, register } = useForm();
  // const { userData, setUserData } = useState({});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // const result = await getUser(props.id);

  //     setUserData(result);
  //   };
  //   fetchData();
  // }, []);

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">
        Username
        <input
          name="username"
          ref={register}
          type="text"
          className="inputField"
        />
      </label>
      <label htmlFor="email">
        email
        <input
          name="email"
          ref={register}
          type="email"
          className="inputField"
        />
      </label>
      <label htmlFor="fullName">
        Full name
        <input
          name="fullName"
          ref={register}
          type="text"
          className="inputField"
        />
      </label>

      <input
        name="organization"
        ref={register}
        type="text"
        className="inputField"
      />
      <input
        name=""
        ref={register}
        type="text"
        className="inputField"
      />
    </form>
  );
};

export default UserDetailsForm;
