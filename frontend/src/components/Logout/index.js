import React from 'react';
import { useAuth } from '../../context/auth';

const Unauth = props => {
  const { setAuthTokens } = useAuth();

  setAuthTokens();
  return <></>;
};

export default Unauth;
