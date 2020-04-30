// Dependencies
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Sidebar from '../../components/Sidebar';
import ChequeList from '../../components/Lists/ChequeList';
import SearchForm from '../../components/Forms/SearchForm';
import ChequeDetails from '../../components/ChequeDetails';

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
  const classes = useStyles();


  return (
    <div className={classes.main}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.container}>
        <SearchForm setSearch={setSearch} />
        <ChequeList query={search} setCheque={setCheque} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      </div>
      {
          drawerOpen
            // eslint-disable-next-line max-len
            ? <ChequeDetails cheque={cheque} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
            : null
        }
    </div>
  );
};


export default Cheques;
