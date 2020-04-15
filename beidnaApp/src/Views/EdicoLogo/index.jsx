import React from 'react';
import { View, Image, Text } from 'react-native';

import EdicoLogo from '../../img/edico-logo.png';
import styles from './style';

const Logo = () => (
  <View style={styles.logoContainer}>
    <Image style={styles.edicoLogo} source={EdicoLogo} alt="logo" />
    <Text style={styles.logoText}>Beiðnakerfi</Text>
  </View>
);

export default Logo;
