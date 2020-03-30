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
    const chequeData = await getCheque(chequeId);
    console.log(chequeData);
    const {
      department, user, description, price, created,
    } = chequeData.data;


    setValue([
      { costSite: department.name },
      { itemDescription: description },
      { itemPrice: price },
      { buyerName: user.username },
      { createdDate: created },
    ]);
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
            if (value.length === 20) {
              getChequeData(value);
            }
          }}
        />

        <input
          className="inputField"
          name="costSite"
          type="text"
          ref={register({ required: true })}
          placeholder="Kostnaðarstaður"
          disabled
        />
      </div>

      <div className="form-group">
        <input
          className="inputField"
          name="itemDescription"
          type="text"
          ref={register({ required: true })}
          placeholder="Verkefni"
          disabled
        />
        <input
          className="inputField"
          name="itemPrice"
          type="text"
          ref={register({ required: true })}
          placeholder="Verkþáttur"
          disabled
        />
      </div>
      <div className="form-group">
        <input
          className="inputField"
          name="buyerName"
          type="text"
          ref={register({ required: true })}
          placeholder="Vinnustaður úttektaraðila"
          disabled
        />
        <input
          className="inputField"
          name="createdDate"
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
