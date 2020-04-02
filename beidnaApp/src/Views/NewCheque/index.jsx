import React, { useState } from 'react';
import { View, Picker } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import Barcode from 'react-native-barcode-builder';
import { useSelector } from 'react-redux';

import EdicoLogo from '../../Views/EdicoLogo';
import TopNavigator from '../../Views/TopNavigator';
import Timer from '../../Components/Timer';



// Styles
import styles from './style';
// service
import * as api from '../../service/apiGateway.js'

const NewCheque = () => {
  const { state: { params : { costsite, cheque }} } = useNavigation();
  return (
    <>
    <View style={styles.container}>
      <TopNavigator />
      <View style={styles.content}>
        <Text>Ný beiðni fyrir</Text><Text>{ costsite.name }</Text>
        <Barcode value={cheque.code} text={cheque.code}  format="CODE128" />
      </View>
    </View>
    <Timer/>
    </>
  );
};
export default NewCheque;
