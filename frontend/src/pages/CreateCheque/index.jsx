// Dependencies
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Sidebar from '../../components/Sidebar';
import SearchForm from '../../components/Forms/SearchForm';
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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sidebarContainer: {
    width: '20%',
  },
}));

const Cheques = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cheque, setCheque] = useState({});
  const [shouldRender, setShouldRender] = useState(true);
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const path =  window.location.pathname;

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
        {
          path === '/createcheque' ?
            <ChequeForm setOpen={setOpen} setErrorOpen={setErrorOpen} setShouldRender={setShouldRender} />
          :
            <SearchForm setSearch={setSearch} />
        }
       <ChequeList
          query={search}
          setCheque={setCheque}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          setShouldRender={setShouldRender}
          shouldRender
        />
        { open ? <SuccessSnackbar open={open} handleClose={handleSuccessSnackbarClose} /> : null }

        { errorOpen
          ? <FailSnackbar open={errorOpen} handleClose={handleFailSnackbarClose} />
          : null}
      </div>
      { drawerOpen
        // eslint-disable-next-line max-len
        ? (
          <ChequeDetails
            cheque={cheque}
            setCheque={setCheque}
            setShouldRender={setShouldRender}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            setOpen={setOpen}
          />
        )
        : null}
    </div>
  );
};

export default Cheques;
