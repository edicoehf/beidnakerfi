// Dependencies
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Source from us
import LoginForm from './components/Forms/LoginForm';
import Home from './pages/Home';
import CreateUser from './pages/CreateUser';
import CreateCheque from './pages/CreateCheque';
import ViewCustomers from './pages/ViewCustomers';
import ViewUsers from './pages/ViewUsers';
import Unauthorized from './components/Unauthorized';

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
        <PrivateRoute path="/home" component={Home} func={checkPrivileges} />
        <PrivateRoute path="/createuser" component={CreateUser} func={checkPrivileges} />
        <PrivateRoute path="/createcheque" component={CreateCheque} func={checkPrivileges} />
        <PrivateRoute path="/viewcustomers" component={ViewCustomers} func={checkPrivileges} />
        <PrivateRoute path="/viewusers" component={ViewUsers} func={checkPrivileges} />
        <Route exact path="/401" component={Unauthorized} />
      </Router>
    </AuthContext.Provider>
  );
};

export default Routes;
