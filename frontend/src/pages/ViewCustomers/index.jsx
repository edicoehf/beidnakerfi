// Dependencies
import React from 'react';

// Components
import Sidebar from '../../components/Sidebar';
import CustomerList from '../../components/Lists/CustomerList';

// Style
import '../Pages.css';

const Main = () => {
  return (
    <div id="mainGrid">
      <div id="sidebar">
        <Sidebar />
      </div>
      <CustomerList />
    </div>
  );
};


export default Main;
