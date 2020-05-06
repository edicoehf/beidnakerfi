// Dependencies
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Sidebar from '../../components/Sidebar';
import DepartmentForm from '../../components/Forms/DepartmentForm';
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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarContainer: {
    width: '20%',
  },
}));

const CreateDepartment = () => {
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
      <div className={classes.sidebarContainer}>
        <Sidebar />
      </div>
      <div className={classes.container}>
        <DepartmentForm setOpen={setOpen} setErrorOpen={setErrorOpen} />
        { open ? <SuccessSnackbar open={open} handleClose={handleSuccessSnackbarClose} successMessage="Ný deild stofnuð." /> : null }
        { errorOpen
          ? <FailSnackbar open={errorOpen} handleClose={handleFailSnackbarClose} errorMessage="Ekki tókst að stofna deild." />
          : null}
      </div>
    </div>
  );
};

export default CreateDepartment;
