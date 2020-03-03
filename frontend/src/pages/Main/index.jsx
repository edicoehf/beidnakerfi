// Dependencies
import React from 'react';

// Components
import Sidebar from '../../components/Sidebar';
import CreateUser from '../../components/CreateUserForms';

// Style
import './Main.css';

const index = () => (
  <div id="mainGrid">
    <div id="sidebar">
      <Sidebar />
    </div>
    <div id="content">
      <CreateUser />
    </div>
  </div>
);

export default index;
