// Dependencies
import React, { useState } from 'react';
// Components
import Sidebar from '../../components/Sidebar';
import StaffList from '../../components/Lists/StaffList';
import SearchForm from '../../components/Forms/SearchForm';
import UserDetails from '../../components/UserDetails';

// Style
import '../Pages.css';

const Main = () => {
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState({});

  return (
    <div id="mainGrid">
      <div id="sidebar">
        <Sidebar />
      </div>
      <div className="container">
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
