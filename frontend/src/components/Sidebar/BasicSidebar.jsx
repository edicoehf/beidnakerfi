import React from 'react';
import { useDispatch } from 'react-redux';

import { switchPage } from '../../actions/pageAction';

const BasicSidebar = () => {
  const dispatch = useDispatch();

  return (
      <button className="sidebarButton" onClick={() => dispatch(switchPage('CreateCheque'))} type="submit">
        Ný beiðni
      </button>
  );
};

export default BasicSidebar;
