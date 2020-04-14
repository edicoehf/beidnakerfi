import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import Barcode from 'react-native-barcode-builder';

import TopNavigator from '../TopNavigator';
import Timer from '../../Components/Timer';

// Styles
import styles from './style';

const NewCheque = () => {
  const { state: { params: { costsite, cheque } } } = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <TopNavigator />
        <View style={styles.content}>
          <Text>Ný beiðni fyrir</Text>
          <Text>{ costsite.name }</Text>
          <Barcode value={cheque.code} text={cheque.code} format="CODE128" />
        </View>
      </View>
      <Timer />
    </>
  );
};
export default NewCheque;
