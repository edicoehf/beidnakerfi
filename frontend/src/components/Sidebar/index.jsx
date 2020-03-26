import React from 'react';
import { Link } from 'react-router-dom';

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
      if (x.path === path) {
        // eslint-disable-next-line no-param-reassign
        x.pressed = true;
      } else {
        // eslint-disable-next-line no-param-reassign
        x.pressed = false;
      }
    });
  };

  changeColor(window.location.pathname);

  return (
    <div id="sidebar">
      <EdicoLogo />
      <div id="buttons">
        {
          buttons.map((x) => (
            <Link to={x.path} key={x.name}>
              {
                x.pressed === true ? (
                  <button type="button" className="sidebarButton pushed" onClick={() => changeColor(x.path)}>
                    {x.name}
                  </button>
                ) : (
                  <button type="button" className="sidebarButton" onClick={() => changeColor(x.path)}>
                    {x.name}
                  </button>
                )
              }
            </Link>
          ))
        }
        <button type="button" className="sidebarButton" onClick={() => logOut()}>
          Utskraning
        </button>
      </div>
    </div>

  );
};

export default Sidebar;
