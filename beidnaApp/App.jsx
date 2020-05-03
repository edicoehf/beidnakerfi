import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import reducers from './src/reducers';

import AppWrapper from './src/AppWrapper';

const App = () => {
  const [fontsLoaded] = useFonts({
    'Roboto': require('./assets/Roboto-Medium.ttf'),
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
