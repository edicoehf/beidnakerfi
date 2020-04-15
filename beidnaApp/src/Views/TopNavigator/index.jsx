import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
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
  const clearcheck = async () => {
    await api.deleteCheque(userInfo.token, params.cheque.code);
  };
  const back = async () => {
    if (routeName === 'NewCheque') {
      await clearcheck();
    }
    goBack();
  };
  const logout = async () => {
    if (routeName === 'NewCheque') {
      await clearcheck();
    }
    await navigate('Login');
    dispatch(setUserInfo(''));
  };

  return (
    <View style={styles.container}>
      {
        routeName === 'Landing' ? (
          <View style={styles.left}>
            <Icon name="person" onPress={() => navigate('UserDetails')}/>
          </View>
        ) : (
          <View style={styles.left}>
            <Icon name="arrow-back" onPress={() => back()} />
          </View>
        )
      }
      <View style={styles.right}>
        <Icon name="door-closed" onPress={async () => logout() }/>
      </View>
    </View>
  );
};

export default TopNavigator;
