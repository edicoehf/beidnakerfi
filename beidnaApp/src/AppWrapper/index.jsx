// System
import React from 'react';
import { View } from 'react-native';

// StyleSheet
import styles from './style';

// Components
import AppContainer from '../routes';

const AppWrapper = () => {

  return (
    <View style={styles.container}>
      <AppContainer />
    </View>
  );
};
export default AppWrapper;
