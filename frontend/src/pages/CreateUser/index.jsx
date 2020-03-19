// Dependencies
import React from 'react';

// Components
import Sidebar from '../../components/Sidebar';
import CreateUser from '../../components/Forms/CreateUserForms';

// Style
import '../Pages.css';

const Main = () => {
  return (
    <div id="mainGrid">
      <div id="sidebar">
        <Sidebar />
      </div>
      <div className='container'>
        <CreateUser />
      </div>
    </div>
  );
};


export default Main;
