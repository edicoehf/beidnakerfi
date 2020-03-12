import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import EdicoLogo from '../EdicoLogo';
import { useAuth } from '../../context/auth';
import './Sidebar.css';


import { getSidebarInfo } from '../../services';

const Sidebar = () => {

  const { setAuthTokens } = useAuth();
  const { buttons } = getSidebarInfo();
  const logOut = () => {
    setAuthTokens();
  };
  const changeColor = (path) => {
    buttons.forEach((x) => {
      if(x.path === path)
        x.pressed = true;
      else x.pressed = false;
    })
  }
  changeColor(window.location.pathname);
  return (
    <div id="sidebar">
      <EdicoLogo />
      <div id="buttons">
        {
          buttons.map((x) =>
            <Link to={x.path} key={x.name}>
              { x.pressed === true ? (
              <button className="sidebarButton pushed" onClick={( ) => changeColor(x.path)} >
                { x.name }
              </button>
            ) : (<button className="sidebarButton" onClick={( ) => changeColor(x.path)} >
              { x.name }
            </button> )}
            </Link>
          )
        }
        <button className="sidebarButton logout" onClick={logOut}>
          Útskráning
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
