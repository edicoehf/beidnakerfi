// Dependencies
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Source
import { useAuth } from './context/auth';
import { views } from './config';

const PrivateRoute = (props) => {
  const { component: Component, func, path } = props;
  const { authTokens } = useAuth();

  const handlePageChange = (parent) => {
    if (authTokens) {
      if (func(views[path])) {
        return <Component parent={parent} />;
      }
    }
    return <Redirect to="/" />;
  };

  return (
    <Route
      func={func}
      path={path}
      render={(parent) => handlePageChange(parent)}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  func: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};
export default PrivateRoute;
