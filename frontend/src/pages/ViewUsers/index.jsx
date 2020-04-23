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
  const [userId, setUserId] = useState('');

  return (
    <div id="mainGrid">
      <div id="sidebar">
        <Sidebar />
      </div>
      <div className="container">
        <SearchForm setSearch={setSearch} />
        <StaffList query={search} setUserId={setUserId} setDrawerOpen={setDrawerOpen} />
      </div>
      <div>
        {
          drawerOpen
            // eslint-disable-next-line max-len
            ? <UserDetails DetailsDrawer={userId} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
            : null
        }
      </div>
    </div>
  );
};


export default Main;
