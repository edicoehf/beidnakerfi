import React from 'react';

import EdicoLogo from '../EdicoLogo';
import { useAuth } from '../../context/auth';
import { createDepartment } from '../../services/apiGateway';
import './Sidebar.css';

const Sidebar = () => {
  const { setAuthTokens } = useAuth();

  const logOut = () => {
    setAuthTokens();
  };

  const handleClick = (e) => {
    e.preventDefault();
    const dept = {
      costsite: 'mamma',
      name: 'inga',
    };
    createDepartment(dept);
  };

  return (
    <div id="sidebar">
      <EdicoLogo />
      <div id="buttons">
        <button className="btn-style sidebar-item" onClick={handleClick} type="submit">
          Ný beiðni
        </button>
        <button id="logout" type="submit" className="btn-style sidebar-item" onClick={logOut}>
          Útskráning
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
