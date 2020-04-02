import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import { useDispatch } from 'react-redux';

import { setUserInfo } from '../../actions/userAction';

// Styles
import styles from './style';

const TopNavigator = () => {
  const logout = async () => {
    //dispatch(await setUserInfo(''));
    navigate('Login')
  }
  const dispatch = useDispatch();
  const { state: { routeName }, goBack, navigate } = useNavigation();
  return (
    <View style={styles.container}>
    {
      routeName === 'Landing' ? (
        <Button buttonStyle={styles.left} titleStyle={styles.buttonTitle} title='ham' onPress={() => console.log('ham')} />
      ) : (
        <Button buttonStyle={styles.left} titleStyle={styles.buttonTitle} title='back' onPress={() => goBack()} />
      )
    }
    <Button buttonStyle={styles.right} titleStyle={styles.buttonTitle} title='out' onPress={logout} />
    </View>
  )};

export default TopNavigator;
