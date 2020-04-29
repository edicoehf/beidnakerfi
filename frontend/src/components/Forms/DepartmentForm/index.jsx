import React from 'react';
import { useForm } from 'react-hook-form';

import { TextField, Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { createDepartment } from '../../../services/apiGateway';

const useStyles = makeStyles((themes) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginTop: themes.spacing(5),
  },

  button: {
    width: '180px',
    height: '50px',
    marginTop: themes.spacing(2),
    marginLeft: 'auto',
  },

  inputField: {
    width: '100%',
    margin: '2px',
  },
}));


const DepartmentFrom = () => {
  const { register, handleSubmit } = useForm();
  const classes = useStyles();

  const onSubmit = async (data) => {
    await console.log(createDepartment({ ...data}));
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="name"
        label="Nafn"
        required
        inputRef={register}
        autoFocus
        className={classes.inputField}
      />
      <TextField
        name="costsite"
        label="Kostnaðarstaður"
        required
        inputRef={register}
        className={classes.inputField}
      />

      <Button color="primary" variant="contained" className={classes.button} type="submit">
        Skrá deild
      </Button>
    </form>
  );
};

export default DepartmentFrom;
