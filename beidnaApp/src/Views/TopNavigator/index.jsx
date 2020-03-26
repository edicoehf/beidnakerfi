import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

// Styles
import styles from './style';

const TopNavigator = () => (
    <View style={styles.container}>
    <Button buttonStyle={styles.hamburger} titleStyle={styles.buttonTitle} title='ham' onPress={() => console.log('ham')} />
    <Button buttonStyle={styles.logout} titleStyle={styles.buttonTitle} title='out' onPress={() => console.log('logout')} />
    </View>
  );

export default TopNavigator;
