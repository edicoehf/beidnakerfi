import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Input, Button, Text, Icon,
} from 'react-native-elements';

// Styles
import styles from './style';

const SetPin = () => {
  const [user, setUser] = useState('');
  // first pin is not saved so i put false as a starting parameter
  const [firstPin, setFirstPin] = useState(false);

  const handleClick = async (input) => {
    if (user.length <= 6) {
      setUser(user + input);
    }
  };
  const vipeOne = async () => {
    setUser(user.substring(0, user.length - 1));
  };
  const submit = async () => {
    if (user.length === 6) {
      if (firstPin === false) {
        setFirstPin(user);
        setUser('');
      } else {
        // Here add navigate if first and second pin ===
      }
    }
  };

  return (
    <View style={styles.pinContainer}>
      { !firstPin ? (<Text>Veldu þér 6 stafa pin</Text>) : (<Text>Staðfestu pin</Text>)}
      <Input
        containerStyle={styles.inputField}
        inputStyle={styles.inputText}
        required
        secureTextEntry
        placeholder="Pin.."
        maxLength={6}
        value={user}
      />
      <View style={styles.buttonGroup}>
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title="1" onPress={async () => handleClick('1')} />
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title="2" onPress={async () => handleClick('2')} />
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title="3" onPress={async () => handleClick('3')} />
      </View>
      <View style={styles.buttonGroup}>
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title="4" onPress={async () => handleClick('4')} />
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title="5" onPress={async () => handleClick('5')} />
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title="6" onPress={async () => handleClick('6')} />
      </View>
      <View style={styles.buttonGroup}>
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title="7" onPress={async () => handleClick('7')} />
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title="8" onPress={async () => handleClick('8')} />
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title="9" onPress={async () => handleClick('9')} />
      </View>
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <Icon name="backspace" iconStyle={styles.icon} onPress={vipeOne} />
        </View>
        <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title="0" onPress={async () => handleClick('0')} />
        <View style={styles.button}>
          <Icon name="check" iconStyle={styles.icon} onPress={submit} />
        </View>
      </View>
    </View>
  );
};
export default SetPin;
