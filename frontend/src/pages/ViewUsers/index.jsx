// Dependencies
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Sidebar from '../../components/Sidebar';
import StaffList from '../../components/Lists/StaffList';
import SearchForm from '../../components/Forms/SearchForm';
import UserDetails from '../../components/UserDetails';

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
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState({});

  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div>
        <Sidebar />
      </div>
      <div className={classes.container}>
        <SearchForm setSearch={setSearch} />
        <StaffList query={search} setUser={setUser} setDrawerOpen={setDrawerOpen} />
      </div>
      {
          drawerOpen
            // eslint-disable-next-line max-len
            ? <UserDetails user={user} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
            : null
        }
    </div>
  );
};


export default Main;
