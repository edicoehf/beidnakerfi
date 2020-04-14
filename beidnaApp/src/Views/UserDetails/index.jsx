import React, { useState } from 'react';
import { View, Picker } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import Barcode from 'react-native-barcode-builder';
import { useSelector } from 'react-redux';

import TopNavigator from '../../Views/TopNavigator';




// Styles
import styles from './style';
// service
import * as api from '../../service/apiGateway.js'

const UserDetails = () => {
  return (

    <View style={styles.container}>
      <TopNavigator />
      <View style={styles.content}>

      </View>
    </View>
    <Timer/>
  );
};
export default NewCheque;
