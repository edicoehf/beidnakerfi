// Dependencies
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Source
import { useAuth } from './Context/auth';

const PrivateRoute = ({ component: Component, ...rest}) => {
  const { authTokens } = useAuth();
  return(
    <Route
      {...rest}
      render={(props) =>
        authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
}

export default PrivateRoute;
