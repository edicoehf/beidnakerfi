// Dependencies
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Source
import { useAuth } from './context/auth';

const PrivateRoute = (props) => {
  const { component: Component, checkPrivileges, path } = props;
  const { authTokens } = useAuth();

  const handlePageChange = (parent) => {
    if (authTokens) {
      if (checkPrivileges(path)) {
        return <Component parent={parent} />;
      }
      return <Redirect to="/401" />;
    }
    return <Redirect to="/" />;
  };

  return (
    <Route
      func={checkPrivileges}
      path={path}
      render={(parent) => handlePageChange(parent)}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  checkPrivileges: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
