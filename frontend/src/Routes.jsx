// Dependencies
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Source from us
import LoginForm from './components/Forms/LoginForm';
import Cheques from './pages/Cheques';
import CreateUser from './pages/CreateUser';
import CreateDepartment from './pages/CreateDepartment';
import ViewUsers from './pages/ViewUsers';
import Unauthorized from './components/Unauthorized';
import BarcodeGenerator from './pages/Barcode';

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
        <PrivateRoute path="/cheques" component={Cheques} checkPrivileges={checkPrivileges} />
        <PrivateRoute path="/createuser" component={CreateUser} checkPrivileges={checkPrivileges} />
        <PrivateRoute path="/createcheque" component={Cheques} checkPrivileges={checkPrivileges} />
        <PrivateRoute path="/createdepartment" component={CreateDepartment} checkPrivileges={checkPrivileges} />
        <PrivateRoute path="/viewusers" component={ViewUsers} checkPrivileges={checkPrivileges} />
        <Route path="/generate/:code" component={BarcodeGenerator} />
        <Route exact path="/401" component={Unauthorized} />
      </Router>
    </AuthContext.Provider>
  );
};

export default Routes;
