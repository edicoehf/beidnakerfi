// Dependencies
import React, { useState } from 'react';
// Components
import Sidebar from '../../components/Sidebar';
import StaffList from '../../components/Lists/StaffList';
import SearchForm from '../../components/Forms/SearchForm';

// Style
import '../Pages.css';

const Main = () => {

  const [search, setSearch] = useState("");

  return (
    <div id="mainGrid">
      <div id="sidebar">
        <Sidebar />
      </div>
      <div className='container'>
        <SearchForm setSearch={setSearch} />
        <StaffList query={search} />
      </div>
    </div>
  );
};


export default Main;
