// Dependencies
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

// Source
import EdicoLogo from '../../EdicoLogo';
import { useAuth } from '../../../context/auth';

// Service
import { login } from '../../../services/apiGateway';


const useStyles = makeStyles((themes) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  },

  button: {
    width: '180px',
    height: '50px',
    marginTop: themes.spacing(2),
  },

  inputField: {
    width: '30%',
    margin: '2px',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
}));

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const { setAuthTokens } = useAuth();

  const tokens = localStorage.getItem('tokens');
  const [isError, setError] = useState(false);
  const classes = useStyles();
  const onSubmit = async (data) => {
    const loginInfo = await login(data);
    if (loginInfo.status === 200) {
      await setAuthTokens(loginInfo.data);
    } else { setError(true); }
  };

  if (tokens !== 'undefined' && tokens !== null) {
    const isSeller = JSON.parse(localStorage.getItem('tokens')).org_seller;
    if (isSeller) {
      return <Redirect to="/createcheque" />;
    }
    return <Redirect to="/cheques" />;
  }

  return (
    <div className={classes.container}>

      <EdicoLogo />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {isError ? <span> Wrong username or password </span> : null}
        <TextField
          className={classes.inputField}
          name="username"
          inputRef={register({ required: true })}
          label="Notendanafn"
        />
        {errors.username && <span>This field is required</span>}
        <TextField
          className={classes.inputField}
          name="password"
          type="password"
          inputRef={register({ required: true })}
          label="Lykilorð"
        />
        {errors.password && <span>This field is required</span>}
        <Button className={classes.button} color="primary" variant="contained" type="submit">Skrá inn</Button>
      </form>

    </div>
  );
};

export default LoginForm;
