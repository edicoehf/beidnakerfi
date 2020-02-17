import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';

import reducers from '../../reducers'
import LoginForm from '../LoginForm/LoginForm';

function App() {
  return (
    <Provider store={createStore(reducers)}>
      <LoginForm />
    </Provider>
  );
}

export default App;