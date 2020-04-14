import React from 'react';
import EdicoLogo from '../../img/edico-logo.png';
import { View, Image } from 'react-native';
import styles from './style.js';
const Logo = () => (
  <View style={styles.logoContainer}>
    <Image style={styles.edicoLogo} source={EdicoLogo} alt="logo" />
  </View>
);

export default Logo;
