// Dependencies
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Sidebar from '../../components/Sidebar';
import CustomerList from '../../components/Lists/CustomerList';
import SearchForm from '../../components/Forms/SearchForm';

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

  return (
    <div className={classes.main}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.container}>
        <SearchForm />
        <CustomerList />
      </div>
    </div>
  );
};

export default Main;
