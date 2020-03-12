// Dependencies
import React from 'react';

// Components
import Sidebar from '../../components/Sidebar';
import ChequeList from '../../components/Lists/ChequeList';
import SearchForm from '../../components/Forms/SearchForm';

// Style
import '../Pages.css';

const Home = () => {
  return (
    <div id="mainGrid">
      <div id="sidebar">
        <Sidebar />
      </div>
      <div className='container'>
        <SearchForm />
        <ChequeList />
      </div>
    </div>
  );
};


export default Home;
