// Dependencies
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Sidebar from '../../components/Sidebar';
import ChequeList from '../../components/Lists/ChequeList';
import SearchForm from '../../components/Forms/SearchForm';
import ChequeDetails from '../../components/ChequeDetails';
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
    width: '80%',
    marginLeft: themes.spacing(5),
    display: 'flex',
    paddingTop: themes.spacing(5),
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const Cheques = () => {
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cheque, setCheque] = useState({});
  const [chequeList, setChequeList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchCheques = async () => {
      const result = await getChequesByOrgId();
      if (result.status === 200) {
        setChequeList(result.data.results);
      }
    };

    fetchCheques();
  }, [cheque]);

  return (
    <div className={classes.main}>
      <div>
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
        />
      </div>
      {
          drawerOpen
            // eslint-disable-next-line max-len
            ? <ChequeDetails setCheque={setCheque} cheque={cheque} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
            : null
        }
    </div>
  );
};


export default Cheques;
