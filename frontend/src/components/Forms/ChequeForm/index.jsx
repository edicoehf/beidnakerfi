import React from 'react';
import { useForm } from 'react-hook-form';
import '../Forms.css';

const ChequeForm = () => {

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
    <div className="forms">
      <h1>Ný beiðni</h1>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            className="inputField "
            name="seller"
            type="text"
            ref={register({ required: true })}
            placeholder="Söluaðili"
            disabled={true}
          />
        </div>
        <div className="form-group">
          <input
            className="inputField"
            name="key"
            type="text"
            ref={register({ required: true })}
            placeholder="Lykill"
            disabled={true}
          />
          {errors.password && <span>This field is required</span>}
          <input
            className="inputField"
            name="costsite"
            type="text"
            ref={register({ required: true })}
            placeholder="Kostnaðarstaður"
            disabled={true}
          />
          {errors.username && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <input
            className="inputField"
            name="username"
            type="text"
            ref={register({ required: true })}
            placeholder="Verkefni"
            disabled={true}
          />
          {errors.username && <span>This field is required</span>}
          <input
            className="inputField"
            name="username"
            type="text"
            ref={register({ required: true })}
            placeholder="Verkþáttur"
            disabled={true}
          />
        </div>
        <div className="form-group">
          <input
            className="inputField"
            name="username"
            type="text"
            ref={register({ required: true })}
            placeholder="Vinnustaður úttektaraðila"
            disabled={true}
          />
          <input
            className="inputField"
            name="username"
            type="text"
            ref={register({ required: true })}
            placeholder="Dagsetning"
            disabled={true}
          />
          {errors.username && <span>This field is required</span>}
        </div>
        <button className="submitButton" type="submit">
          Skrá beiðni
        </button>
      </form>
    </div>

  );
}

export default ChequeForm;
