// Dependencies
import React, {useState} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';


// Source from us
import LoginForm from './components/LoginForm';
import TestHomePage from './components/TestHomePage';
import TestHomePage2 from './components/TestHomePage2';
import TestHomePage3 from './components/TestHomePage3';
import UserForm from './components/UserForm';
import { AuthContext } from './context/auth';
import PrivateRoute from './PrivateRoute';

// Services
import { checkGroups } from './services'

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
          <Route exact path='/createuser' component={UserForm} func={checkGroups}/>
          <PrivateRoute path='/home' component={TestHomePage} func={checkGroups} />
          <PrivateRoute path='/home2' component={TestHomePage2} func={checkGroups} />
          <PrivateRoute path='/home3' component={TestHomePage3} func={checkGroups} />
      </Router>
    </AuthContext.Provider>
  )
}

export default Routes
