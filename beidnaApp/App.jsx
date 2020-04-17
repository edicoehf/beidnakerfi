import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import AppWrapper from './src/AppWrapper';

const App = () => {
  let [fontsLoaded] = useFonts({
    'Roboto': require('./assets/Roboto-Medium.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={createStore(reducers)}>
        <AppWrapper />
      </Provider>
    );
  }
}

export default App;
