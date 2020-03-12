// Dependencies
import React from 'react';

// Components
import Sidebar from '../../components/Sidebar';
import StaffList from '../../components/Lists/StaffList';
import SearchForm from '../../components/Forms/SearchForm';

// Style
import '../Pages.css';

const Main = () => {
  return (
    <div id="mainGrid">
      <div id="sidebar">
        <Sidebar />
      </div>
      <div className='container'>
        <SearchForm />
        <StaffList />
      </div>
    </div>
  );
};


export default Main;
