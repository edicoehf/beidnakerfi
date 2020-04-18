// Dependencies
import React, { useState } from 'react';

// Components
import Sidebar from '../../components/Sidebar';
import ChequeList from '../../components/Lists/ChequeList';
import SearchForm from '../../components/Forms/SearchForm';

// Style
import '../Pages.css';

const Cheques = () => {
  const [search, setSearch] = useState('');

  return (
    <div id="mainGrid">
      <div id="sidebar">
        <Sidebar />
      </div>
      <div className="container">
        <SearchForm setSearch={setSearch} />
        <ChequeList query={search} />
      </div>
    </div>
  );
};


export default Cheques;
