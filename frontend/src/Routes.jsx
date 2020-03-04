// Dependencies
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Source from us
import LoginForm from './components/LoginForm';
import Main from './pages/Main';
import Unauthorized from './components/Unauthorized';
import Logout from './components/Logout';

import { AuthContext } from './context/auth';
import PrivateRoute from './PrivateRoute';

// Services
import { checkPrivileges } from './services';

const Routes = () => {
  const [authTokens, setAuthTokens] = useState(localStorage.getItem('tokens') || '');

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Route exact path="/" component={LoginForm} />
        <PrivateRoute path="/main" component={Main} func={checkPrivileges} />
        <Route exact path="/401" component={Unauthorized} />
        <Route exact path="/logout" component={Logout} />
      </Router>
    </AuthContext.Provider>
  );
};

export default Routes;
