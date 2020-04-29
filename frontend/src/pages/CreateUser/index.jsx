// Dependencies
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Sidebar from '../../components/Sidebar';
import CreateUser from '../../components/Forms/CreateUserForms';
import SuccessSnackbar from '../../components/Snackbars/SuccessSnackbar';
import FailSnackbar from '../../components/Snackbars/FailSnackbar';

const useStyles = makeStyles((themes) => ({
  main: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  container: {
    width: '80%',
    marginLeft: themes.spacing(5),
  },
}));

const Main = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleFailSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false);
  };

  return (
    <div className={classes.main}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.container}>
        <CreateUser setOpen={setOpen} setErrorOpen={setErrorOpen} />
        { open ? <SuccessSnackbar open={open} handleClose={handleSuccessSnackbarClose} /> : null }
        { errorOpen
          ? <FailSnackbar open={errorOpen} handleClose={handleFailSnackbarClose} />
          : null}
      </div>
    </div>
  );
};

export default Main;
