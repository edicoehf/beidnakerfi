// System
import React from 'react';
import { View } from 'react-native';

// StyleSheet
import styles from './style';

// Components
import AppContainer from '../routes';

const AppWrapper = () => (
  <View style={styles.container}>
    <AppContainer style={styles.font} />
  </View>
);
export default AppWrapper;
