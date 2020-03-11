import React from 'react';
import { useForm } from 'react-hook-form';
import '../Container.css';
import ChequeList from '../../Lists/ChequeList';
import ChequeForm from '../../Forms/ChequeForm';

const NewChequeContainer = () => {

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
    <div className="NewChequeContainer">
    <ChequeForm />
    <ChequeList />
    </div>
  );
}

export default NewChequeContainer;