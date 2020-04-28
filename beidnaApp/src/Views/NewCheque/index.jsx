import React from 'react';
import { View, BackHandler } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import TopNavigator from '../TopNavigator';
import Timer from '../../Components/Timer';

import { deleteCheque } from '../../service/apiGateway';


// Styles
import styles from './style';

const NewCheque = () => {
  const { state: { params: { costsite, cheque } }, goBack } = useNavigation();
  console.log(cheque.code);
  const { userInfo } = useSelector((state) => state.userInfo);

  BackHandler.addEventListener('hardwareBackPress',async () => {
    await deleteCheque(userInfo.token, cheque.code);
    goBack();
  });
  return (
    <>
      <View style={styles.container}>
        <TopNavigator />
        <View style={styles.content}>
          <Text>Ný beiðni fyrir:</Text>
          <Text style={styles.costsite}>{ costsite.name }</Text>
        </View>

      </View>
      <Timer />
    </>
  );
};
export default NewCheque;

// <View style={styles.web}>
//   <WebView
//     source={{ uri: `http://beidnakerfi.herokuapp.com/generate/${cheque.code}` }}
//     startInLoadingState
//     bounces={false}
//     scrollEnabled={false}
//   />
// </View>
