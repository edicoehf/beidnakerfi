import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';

import AppWrapper from './src/AppWrapper';

const App = () => (
  <Provider store={createStore(reducers)}>
    <AppWrapper />
  </Provider>
);
export default App;
