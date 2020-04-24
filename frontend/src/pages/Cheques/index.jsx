// Dependencies
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

// Components
import Sidebar from '../../components/Sidebar';
import ChequeList from '../../components/Lists/ChequeList';
import SearchForm from '../../components/Forms/SearchForm';

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
  },
}));

const Cheques = () => {
  const [search, setSearch] = useState('');
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.container}>
        <SearchForm setSearch={setSearch} />
        <ChequeList query={search} />
      </div>
    </div>
  );
};


export default Cheques;
