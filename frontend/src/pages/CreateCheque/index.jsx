// Dependencies
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Sidebar from '../../components/Sidebar';
import ChequeList from '../../components/Lists/ChequeList';
import ChequeForm from '../../components/Forms/ChequeForm';
import ChequeDetails from '../../components/ChequeDetails';
import SuccessSnackbar from '../../components/Snackbars/SuccessSnackbar';
import FailSnackbar from '../../components/Snackbars/FailSnackbar';
import { getChequesByOrgId } from '../../services/apiGateway';

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

const Main = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cheque, setCheque] = useState({});
  const [shouldRender, setShouldRender] = useState(true);
  const [chequeList, setChequeList] = useState([]);
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    const fetchCheques = async () => {
      const result = await getChequesByOrgId();
      if (result.status === 200) {
        setChequeList(result.data.results);
        setShouldRender(false);
      }
    };

    if (shouldRender) fetchCheques();
  }, [shouldRender]);

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
        <ChequeForm setOpen={setOpen} setErrorOpen={setErrorOpen} setShouldRender={setShouldRender} />
        <ChequeList
          setCheque={setCheque}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          chequeList={chequeList}
          setChequeList={setChequeList}
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
            setErrorOpen={setErrorOpen}
          />
        )
        : null}
    </div>
  );
};

export default Main;
