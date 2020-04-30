// Dependencies
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Sidebar from '../../components/Sidebar';
import ChequeList from '../../components/Lists/ChequeList';
import ChequeForm from '../../components/Forms/ChequeForm';
import ChequeDetails from '../../components/ChequeDetails';
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cheque, setCheque] = useState({});
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
        <ChequeForm setOpen={setOpen} setErrorOpen={setErrorOpen} />
        <ChequeList setCheque={setCheque} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        { open ? <SuccessSnackbar open={open} handleClose={handleSuccessSnackbarClose} /> : null }

        { errorOpen
          ? <FailSnackbar open={errorOpen} handleClose={handleFailSnackbarClose} />
          : null}
      </div>
      { drawerOpen
        // eslint-disable-next-line max-len
        ? <ChequeDetails cheque={cheque} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        : null}
    </div>
  );
};

export default Main;
