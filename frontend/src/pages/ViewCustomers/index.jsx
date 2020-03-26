// Dependencies
import React from 'react';

// Components
import Sidebar from '../../components/Sidebar';
import CustomerList from '../../components/Lists/CustomerList';
import SearchForm from '../../components/Forms/SearchForm';

// Style
import '../Pages.css';

const Main = () => (
  <div id="mainGrid">
    <div id="sidebar">
      <Sidebar />
    </div>
    <div className="container">
      <SearchForm />
      <CustomerList />
    </div>
  </div>
);


export default Main;
