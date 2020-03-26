import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';

import EdicoLogo from '../../Views/EdicoLogo';


// Styles
import styles from './style';
// service
import * as api from '../../service/apiGateway.js'

const SetPin = () => {
  const [user, setUser] = useState('');
  const { navigate } = useNavigation();
  // first pin is not saved so i put false as a starting parameter
  const [firstPin, setFirstPin] = useState(false);

  const handleClick = async (input) => {
      if(user.length <= 6){
        setUser(user+input);
      }

  };
  const vipeOne = async () => {
        setUser(user.substring(0, user.length-1));
  };
  const submit = async () => {
    if(user.length === 6 )
      if(firstPin === false){
        setFirstPin(user);
        setUser('');
      } else {
        console.log(firstPin === user)
      }

  };

  return (
    <View style={styles.pinContainer}>
      { !firstPin ? (<Text>Veldu þér 6 stafa pin</Text>) : (<Text>Staðfestu pin</Text>)}
      <Input
        containerStyle={styles.inputField}
        inputStyle={styles.inputText}
        required
        secureTextEntry={true}
        placeholder="Pin.."
        maxLength={6}
        value={user}
      />
      <View style={styles.buttonGroup}>
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='1' onPress={async () => await handleClick('1')} />
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='2' onPress={async () => await handleClick('2')} />
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='3' onPress={async () => await handleClick('3')} />
      </View>
      <View style={styles.buttonGroup}>
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='4' onPress={async () => await handleClick('4')} />
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='5' onPress={async () => await handleClick('5')} />
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='6' onPress={async () => await handleClick('6')} />
      </View>
      <View style={styles.buttonGroup}>
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='7' onPress={async () => await handleClick('7')} />
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='8' onPress={async () => await handleClick('8')} />
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='9' onPress={async () => await handleClick('9')} />
      </View>
      <View style={styles.buttonGroup}>
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='<=' onPress={async () => await vipeOne()} />
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='0' onPress={async () => await handleClick('0')} />
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='go' onPress={async () => await submit()} />
      </View>
    </View>
  );
};
export default SetPin;
