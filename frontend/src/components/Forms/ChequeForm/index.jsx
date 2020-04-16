import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../Forms.css';
import { getCheque, updateCheque } from '../../../services/apiGateway';

const ChequeForm = () => {
  const {
    register, handleSubmit, errors, setValue, setError, clearError,
  } = useForm();

  const [chequeStatus, setChequeStatus] = useState(0);

  const onSubmit = async (data) => {
    if (chequeStatus === 2) {
      setError('key', 'inUse', 'Beiðni er nú þegar í notkun');
    } else if (chequeStatus === 1) {
      clearError('key');
      const { itemDescription, key, itemPrice } = data;
      await updateCheque({ itemDescription, key, itemPrice });
    }
  };

  const getChequeData = async (chequeId) => {
    const chequeData = await getCheque(chequeId);
    if ('detail' in chequeData) {
      setError('key', 'invalidKey', 'Beiðni er ekki til');
    } else {
      clearError('key');
      const {
        department, user, created, status,
      } = chequeData;


      setValue([
        { costSite: department.name },
        { buyerName: user.username },
        { createdDate: created },
      ]);

      setChequeStatus(status);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {errors.key && <span>{errors.key.message}</span>}
      <div className="form-group">
        <input
          className="inputField"
          name="key"
          type="text"
          ref={register({ required: true, maxLength: 20, minLength: 20 })}
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
          placeholder="Kostnaða rstaður"
          disabled
        />
      </div>

      <div className="form-group">
        <input
          className="inputField"
          name="itemDescription"
          type="text"
          ref={register({ required: true })}
          placeholder="Lýsing"
        />
        <input
          className="inputField"
          name="itemPrice"
          type="text"
          ref={register({ required: true })}
          placeholder="Verð"

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
