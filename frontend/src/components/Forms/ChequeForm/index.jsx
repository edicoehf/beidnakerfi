import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { getCheque, updateCheque } from '../../../services/apiGateway';

const useStyles = makeStyles((themes) => ({
  inputField: {
    width: '50%',
    marginRight: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginTop: themes.spacing(7),
  },
  formGroup: {
    width: '100%',
    display: 'flex',
  },
  submitButton: {
    marginTop: themes.spacing(3),
    marginLeft: '70px',
    width: '30%',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}));

const ChequeForm = (props) => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
  } = useForm();

  const classes = useStyles();
  const [chequeData, setChequeData] = useState({
    costSite: '',
    buyerName: '',
    createdDate: '',
  });
  const [chequeStatus, setChequeStatus] = useState(0);
  const priceField = useRef(null);

  const { setOpen, setErrorOpen, setShouldRender } = props;


  const onSubmit = async (data, e) => {
    if (chequeStatus >= 2) {
      setError('key', 'inUse', 'Beiðni er nú þegar í notkun');
    } else if (chequeStatus === 1) {
      clearError('key');
      const {
        itemDescription, key, itemPrice, invoiceNumber,
      } = data;
      const result = await updateCheque({
        itemDescription, key, itemPrice, invoiceNumber,
      });

      if (result.status === 200) {
        setOpen(true);
        setShouldRender(true);
        setChequeData({
          costSite: '',
          buyerName: '',
          createdDate: '',
        });
      } else {
        setErrorOpen(true);
      }
    }
    e.target.reset();
  };

  const getChequeData = async (chequeId) => {
    const result = await getCheque(chequeId);
    if ('detail' in result.data) {
      setError('key', 'invalidKey', 'Beiðni er ekki til');
    } else {
      clearError('key');
      const {
        department, user, status,
      } = result.data;

      const { created } = result;

      setChequeData({
        costSite: department.name,
        buyerName: user.username,
        createdDate: created,
      });
      setChequeStatus(status);
      priceField.current.focus();
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
            inputRef={register({ required: true, maxLength: 13, minLength: 13 })}
            label="Lykill"
            onChange={(e) => {
              const { value } = e.target;
              if (value.length === 13) {
                getChequeData(value);
              }
            }}
            autoFocus
          />
          <TextField
            className={classes.inputField}
            name="createdDate"
            inputRef={register}
            label="Tími og dagsetning stofnunar"
            value={chequeData.createdDate}
            disabled
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            className={classes.inputField}
            name="costSite"
            inputRef={register}
            label="Kostnaðarstaður"
            disabled
            value={chequeData.costSite}
            onChange={(e) => e.target.value}
          />
          <TextField
            className={classes.inputField}
            name="buyerName"
            inputRef={register}
            label="Úttektaraðili"
            value={chequeData.buyerName}
            disabled
          />
        </div>


        <div className={classes.formGroup}>
          <TextField
            className={classes.inputField}
            name="invoiceNumber"
            inputRef={register}
            label="Tilvísun í reikning"
          />
          <TextField
            className={classes.inputField}
            name="itemPrice"
            inputRef={(e) => {
              register(e);
              priceField.current = e;
            }}
            label="Verð"
            required
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            className={classes.inputField}
            name="itemDescription"
            inputRef={register}
            label="Lýsing"
            required
          />

          <Button variant="contained" color="primary" className={classes.submitButton} type="submit">
            Skrá beiðni
          </Button>
        </div>

      </form>
    </div>
  );
};

ChequeForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
  setErrorOpen: PropTypes.func.isRequired,
  setShouldRender: PropTypes.func.isRequired,
};
export default ChequeForm;
