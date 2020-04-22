import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import { WebView } from 'react-native-webview';

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
          <Text>Ný beiðni fyrir:</Text>
          <Text style={styles.costsite}>{ costsite.name }</Text>
        </View>
        <View style={styles.web}>
          <WebView
            source={{ uri: `http://beidnakerfi.herokuapp.com/generate/${cheque.code}` }}
            startInLoadingState
            bounces={false}
            scrollEnabled={false}
          />
        </View>
      </View>
      <Timer />
    </>
  );
};
export default NewCheque;
