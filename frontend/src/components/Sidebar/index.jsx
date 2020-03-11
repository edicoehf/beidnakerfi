import React from 'react';

import EdicoLogo from '../EdicoLogo';
import { useAuth } from '../../context/auth';
import './Sidebar.css';

import { sidebarButtons } from '../../config';
import { checkPrivileges } from '../../services';
import BasicSidebar from './BasicSidebar';
import SuperSellerSidebar from './SuperSellerSidebar';
import SuperBuyerSidebar from './SuperBuyerSidebar';

const Sidebar = () => {
  const { setAuthTokens } = useAuth();

  const logOut = () => {
    setAuthTokens();
  };

  return (
    <div id="sidebar">
      <EdicoLogo />
      <div id="buttons">
        { checkPrivileges(sidebarButtons.Basic) ? <BasicSidebar /> : null }
        { checkPrivileges(sidebarButtons.SuperSeller) ? <SuperSellerSidebar /> : null }
        { checkPrivileges(sidebarButtons.SuperBuyer) ? <SuperBuyerSidebar /> : null }
        <button id="logout" type="submit" className="btn-style button-item" onClick={logOut}>
          Útskráning
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
