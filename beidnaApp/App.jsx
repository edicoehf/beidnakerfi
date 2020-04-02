import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StyleSheet, Text, View } from 'react-native';
import reducers from './src/reducers';

import AppWrapper from './src/AppWrapper';

const App = () => {
  return (
    <Provider store={createStore(reducers)}>
      <AppWrapper />
    </Provider>
  );
}
export default App;
