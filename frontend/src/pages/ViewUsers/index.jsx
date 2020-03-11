// Dependencies
import React from 'react';

// Components
import Sidebar from '../../components/Sidebar';
import StaffList from '../../components/Lists/StaffList';

// Style
import '../Pages.css';

const Main = () => {
  return (
    <div id="mainGrid">
      <div id="sidebar">
        <Sidebar />
      </div>
      <StaffList />
    </div>
  );
};


export default Main;
