import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import { useDispatch, useSelector } from 'react-redux';

import { setUserInfo } from '../../actions/userAction';

// service
import * as api from '../../service/apiGateway';
// Styles
import styles from './style';

const TopNavigator = () => {
  const dispatch = useDispatch();
  const { state: { routeName, params }, goBack, navigate } = useNavigation();
  const { userInfo } = useSelector((state) => state.userInfo);
  const back = () => {
    api.deleteCheque(userInfo.token, params.cheque.code)
    goBack()
  }
  const logout = () => {
    api.deleteCheque(userInfo.token, params.cheque.code)
    navigate('Login')
  }
  return (
    <View style={styles.container}>
    {
      routeName === 'Landing' ? (
        <Button buttonStyle={styles.left} titleStyle={styles.buttonTitle} title='ham' onPress={() => console.log('ham')} />
      ) :  null
    }
    {
      routeName === 'NewCheque' ? (
        <Button buttonStyle={styles.left} titleStyle={styles.buttonTitle} title='back' onPress={() => back()} />
      ) : null
    }
    <Button buttonStyle={styles.right} titleStyle={styles.buttonTitle} title='out' onPress={logout} />
    </View>
  )};

export default TopNavigator;
