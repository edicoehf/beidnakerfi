import React from 'react';
import { View } from 'react-native';

import TopNavigator from '../TopNavigator';
import CostSitePicker from '../../Components/CostSitePicker';

// Styles
import styles from './style';

const Landing = () => (
  <View style={styles.container}>
    <TopNavigator />
    <View style={styles.content}>
      <CostSitePicker />
    </View>
  </View>
);

export default Landing;
