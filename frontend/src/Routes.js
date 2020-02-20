import React from 'react';
import LoginForm from './components/LoginForm';
import TestHomePage from './components/TestHomePage';

 const routes = {
  '/' : () => <TestHomePage />,
  '/loginform': () => <LoginForm />
}
export default routes
