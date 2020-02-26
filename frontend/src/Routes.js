// Dependencies
import React, {useState} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { useSelector } from 'react-redux';

// Source from us
import LoginForm from './components/LoginForm';
import TestHomePage from './components/TestHomePage';
import { AuthContext } from './context/auth';
import PrivateRoute from './PrivateRoute';


const Routes = () => {
  const [authTokens, setAuthTokens] = useState(localStorage.getItem("tokens") || '');

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
          <Route exact path='/' component={LoginForm} />
          <PrivateRoute path='/home' component={TestHomePage} />
      </Router>
    </AuthContext.Provider>
  )
}

export default Routes
