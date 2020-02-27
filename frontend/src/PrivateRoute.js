// Dependencies
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Source
import { useAuth } from './context/auth';
import { views } from './config'

const PrivateRoute = ({ component: Component, ...rest}) => {
  const { authTokens } = useAuth();
  return(
    <Route
      {...rest}
      render={(props) =>
        authTokens ? (
          rest.func(views[rest.path]) ? <Component {...props} /> : <Redirect to='/mammamia' />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
}

export default PrivateRoute;
