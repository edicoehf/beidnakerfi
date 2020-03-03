// Dependencies
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Source from us
import Routes from '../Routes.js';

// Service
import Reducers from '../reducers';

function App() {
  return (
    <Provider store={createStore(Reducers)}>
      <Routes />
    </Provider>
  );
}

export default App;
