import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';

import TopNavigator from '../TopNavigator';
import CostSitePicker from '../../Components/CostSitePicker';

// Styles
import styles from './style';

const Landing = () => {
return (
  <View style={styles.container}>
    <TopNavigator />
    <View style={styles.content}>
      <CostSitePicker />
    </View>
  </View>
  );
}
export default Landing;
