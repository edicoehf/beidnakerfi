// Dependencies
import React from 'react';

// Components
import Sidebar from '../../components/Sidebar';
import ChequeList from '../../components/Lists/ChequeList';
import ChequeForm from '../../components/Forms/ChequeForm';
// Style
import '../Pages.css';

const Main = () => {
  return (
    <div id="mainGrid">
      <div id="sidebar">
        <Sidebar />
      </div>
      <div className="NewChequeContainer" >
        <ChequeForm />
        <ChequeList />
      </div>
    </div>
  );
};


export default Main;
