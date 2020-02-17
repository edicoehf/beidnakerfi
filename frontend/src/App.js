import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';

import reducers from './reducers'

function App() {
  return (
    <Provider store={createStore(reducers)}>
      <h1> appapapap </h1>
    </Provider>
  );
}

export default App;
