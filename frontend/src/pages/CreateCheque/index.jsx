// Dependencies
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Sidebar from '../../components/Sidebar';
import ChequeList from '../../components/Lists/ChequeList';
import ChequeForm from '../../components/Forms/ChequeForm';
import ChequeDetails from '../../components/ChequeDetails';

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

  return (
    <div className={classes.main}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.container}>
        <ChequeForm />
        <ChequeList setCheque={setCheque} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
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

export default Main;
