import React from 'react';
import { useForm } from 'react-hook-form';
import '../Forms.css';
import { getCheque } from '../../../services/apiGateway';

const ChequeForm = () => {
  const {
    register, handleSubmit, errors, setValue,
  } = useForm();

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

  const getChequeData = async (chequeId) => {
    console.log(chequeId);
    setValue('costsite', 'tmp costsite');
    // const chequeData = await getCheque(chequeId);
    // console.log(chequeData);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {errors.key && <span>{errors.key.message}</span>}
      <div className="form-group">
        <input
          className="inputField"
          name="key"
          type="text"
          ref={register({ required: 'Invalid key', maxLength: 12, minLength: 12 })}
          placeholder="Lykill"
          onChange={(e) => {
            const { value } = e.target;
            if (value.length === 12) {
              getChequeData(value);
            }
          }}
        />

        <input
          className="inputField"
          name="costsite"
          type="text"
          ref={register({ required: true })}
          placeholder="Kostnaðarstaður"
          disabled
        />
      </div>

      <div className="form-group">
        <input
          className="inputField"
          name="description"
          type="text"
          ref={register({ required: true })}
          placeholder="Verkefni"
          disabled
        />
        <input
          className="inputField"
          name="username"
          type="text"
          ref={register({ required: true })}
          placeholder="Verkþáttur"
          disabled
        />
      </div>
      <div className="form-group">
        <input
          className="inputField"
          name="buyer-workplace"
          type="text"
          ref={register({ required: true })}
          placeholder="Vinnustaður úttektaraðila"
          disabled
        />
        <input
          className="inputField"
          name="date"
          type="text"
          ref={register({ required: true })}
          placeholder="Tími og dagsetning stofnunar"
          disabled
        />
      </div>
      <button className="submitButton" type="submit">
        Skrá beiðni
      </button>
    </form>

  );
};

export default ChequeForm;
