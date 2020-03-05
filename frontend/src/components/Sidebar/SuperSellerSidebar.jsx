import React from 'react';
import { useDispatch } from 'react-redux';

import { switchPage } from '../../actions/pageAction';

const SuperSellerSidebar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button className="btn-style button-item" onClick={() => dispatch(switchPage('CreateUser'))} type="submit">
        Skrá starfsmann
      </button>
      <button className="btn-style button-item" onClick={() => dispatch(switchPage('ViewUsers'))} type="submit">
        Starfsmannalisti
      </button>
      <button className="btn-style button-item" onClick={() => dispatch(switchPage('ViewCustomers'))} type="submit">
        Viðskiptamannalisti
      </button>
      <button className="btn-style button-item" onClick={() => dispatch(switchPage('Home'))} type="submit">
        Yfirlit beiðna
      </button>
    </>
  );
};

export default SuperSellerSidebar;
