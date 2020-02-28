import React from "react";

import EdicoLogo from "../EdicoLogo"
import { useAuth } from "../../Context/auth";

import "./Sidebar.css";

const Sidebar = () => {
  const { setAuthTokens } = useAuth();

  const logOut = () => {
    setAuthTokens();
  };

  return (
    <div id="sidebar">
      <EdicoLogo/>
      <div id="buttons">
        <button className="btn-style sidebar-item" type="submit">
            Ný beiðni
        </button>
        <button id='logout' className="btn-style sidebar-item" onClick={logOut}>
            Útskráning
        </button>
      </div>  
    </div>
  );
};

export default Sidebar;
