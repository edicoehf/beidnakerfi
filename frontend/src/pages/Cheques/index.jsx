// Dependencies
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Sidebar from '../../components/Sidebar';
import ChequeList from '../../components/Lists/ChequeList';
import SearchForm from '../../components/Forms/SearchForm';
import ChequeDetails from '../../components/ChequeDetails';
import SuccessSnackbar from '../../components/Snackbars/SuccessSnackbar';

import { getChequesByOrgId } from '../../services/apiGateway';


// Style

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
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [cheque, setCheque] = useState({});
  const [chequeList, setChequeList] = useState([]);
  const [open, setOpen] = useState(false);
  const [chequeCount, setChequeCount] = useState(0);
  const [page, setPage] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const fetchCheques = async () => {
      const result = await getChequesByOrgId(page);
      if (result.status === 200) {
        setChequeList(result.data.results);
        setChequeCount(result.data.count);
        setShouldRender(false);
      }
    };

    fetchCheques();
  }, [shouldRender]);


  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.main}>
      <div className={classes.sidebarContainer}>
        <Sidebar />
      </div>
      <div className={classes.container}>
        <SearchForm setSearch={setSearch} />
        <ChequeList
          query={search}
          setCheque={setCheque}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          chequeList={chequeList}
          setChequeList={setChequeList}
          count={chequeCount}
          setPage={setPage}
          page={page}
          setShouldRender={setShouldRender}
        />
        { open ? <SuccessSnackbar open={open} handleClose={handleSuccessSnackbarClose} /> : null }
      </div>
      {
          drawerOpen
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
            : null
        }

    </div>
  );
};


export default Cheques;
