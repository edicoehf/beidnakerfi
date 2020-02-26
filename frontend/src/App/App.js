// Dependencies
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Source from us
import Routes from '../Routes.js'

// Service
import reducers from '../reducers'

function App() {
  return (
    <Provider store={createStore(reducers)}>
      {
        <Routes />
      }
    </Provider>
  );
}

export default App;
