// Dependencies
import React from 'react';

// Components
import Sidebar from '../../components/Sidebar';
import ChequeList from '../../components/Lists/ChequeList';
// Style
import '../Pages.css';

const Home = () => {
  return (
    <div id="mainGrid">
      <div id="sidebar">
        <Sidebar />
      </div>
      <ChequeList />
    </div>
  );
};


export default Home;
