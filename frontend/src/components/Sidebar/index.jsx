import React from 'react';
import { Link } from 'react-router-dom';

import EdicoLogo from '../EdicoLogo';
import { useAuth } from '../../context/auth';
import './Sidebar.css';


import { getSidebarInfo } from '../../services';

const Sidebar = () => {
  const { setAuthTokens } = useAuth();
  const { buttons } = getSidebarInfo();
  console.log(buttons)
  const logOut = () => {
    setAuthTokens();
  };


  console.log(buttons)
  return (
    <div id="sidebar">
      <EdicoLogo />
      <div id="buttons">
        {
          buttons.map((x) =>
            <Link to={x.path}>
              <button className="sidebarButton">
                { x.name }
              </button>
            </Link>
          )
        }
        <button id="logout" className="sidebarButton" onClick={logOut}>
          Útskráning
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
