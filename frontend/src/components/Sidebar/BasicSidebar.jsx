import React from 'react';
import { useDispatch } from 'react-redux';

import { switchPage } from '../../actions/pageAction';

const BasicSidebar = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button className="btn-style sidebar-item" onClick={() => dispatch(switchPage('CreateCheque'))} type="submit">
        Ný beiðni
      </button>
    </div>
  );
};

export default BasicSidebar;
