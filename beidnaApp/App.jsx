import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import reducers from './src/reducers';

import AppWrapper from './src/AppWrapper';

const roboto = require('./assets/Roboto-Medium.ttf');

const App = () => {
  const [fontsLoaded] = useFonts({
    roboto,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={createStore(reducers)}>
      <AppWrapper />
    </Provider>
  );
};

export default App;
