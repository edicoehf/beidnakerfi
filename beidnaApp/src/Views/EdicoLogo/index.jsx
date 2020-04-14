import React from 'react';
import { View, Image } from 'react-native';

import EdicoLogo from '../../img/edico-logo.png';
import styles from './style';

const Logo = () => (
  <View style={styles.logoContainer}>
    <Image style={styles.edicoLogo} source={EdicoLogo} alt="logo" />
  </View>
);

export default Logo;
