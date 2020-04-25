import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { getCheque, updateCheque } from '../../../services/apiGateway';

const useStyles = makeStyles((themes) => ({
  inputField: {
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginTop: themes.spacing(7),
  },
  formGroup: {
    width: '100%',
    display: 'flex',
  },
  submitButton: {
    marginTop: themes.spacing(3),
    marginLeft: 'auto',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const ChequeForm = () => {
  const {
    register, handleSubmit, errors, setValue, setError, clearError,
  } = useForm();

  const classes = useStyles();

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
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {errors.key && <span>{errors.key.message}</span>}
        <div className={classes.formGroup}>
          <TextField
            className={classes.inputField}
            name="key"
            inputRef={register({ required: true, maxLength: 20, minLength: 20 })}
            label="Lykill"
            onChange={(e) => {
              const { value } = e.target;
              if (value.length === 20) {
                getChequeData(value);
              }
            }}
            autoFocus
          />
          <TextField
            className={classes.inputField}
            name="costSite"
            inputRef={register({ required: true })}
            label="Kostnaðarstaður"
            disabled
          />
        </div>

        <div className={classes.formGroup}>
          <TextField
            className={classes.inputField}
            name="itemDescription"
            inputRef={register({ required: true })}
            label="Lýsing"
          />
          <TextField
            className={classes.inputField}
            name="itemPrice"
            inputRef={register({ required: true })}
            label="Verð"
          />
        </div>

        <div className={classes.formGroup}>
          <TextField
            className={classes.inputField}
            name="buyerName"
            inputRef={register({ required: true })}
            label="Vinnustaður úttektaraðila"
            disabled
          />
          <TextField
            className={classes.inputField}
            name="createdDate"
            inputRef={register({ required: true })}
            label="Tími og dagsetning stofnunar"
            disabled
          />
        </div>

        <Button variant="contained" color="primary" className={classes.submitButton} type="submit">
          Skrá beiðni
        </Button>
      </form>
    </div>
  );
};

export default ChequeForm;
