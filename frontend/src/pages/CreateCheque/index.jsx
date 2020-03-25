// Dependencies
import React from 'react';

// Components
import Sidebar from '../../components/Sidebar';
import ChequeList from '../../components/Lists/ChequeList';
import ChequeForm from '../../components/Forms/ChequeForm';
// Style
import '../Pages.css';

const Main = () => (
  <div id="mainGrid">
    <div id="sidebar">
      <Sidebar />
    </div>
    <div className="container">
      <ChequeForm />
      <ChequeList />
    </div>
  </div>
);


export default Main;
