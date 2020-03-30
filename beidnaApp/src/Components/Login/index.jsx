import React, { useState } from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import {
  Input, Button, Overlay, Text, Avatar,
} from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';

import EdicoLogo from '../../Views/EdicoLogo';

// Styles
import styles from './style';
// service
import * as api from '../../service/apiGateway.js'

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [isError, setError] = useState(false);
  const { navigate } = useNavigation();

  const handleAdd = async () => {
    const loginInfo = await api.login(user);
    if (loginInfo.status === 200) {
      navigate('Landing');
    } else { setError(true); }
  };


  return (
    <>
    <EdicoLogo />
    <View style={styles.loginContainer}>
      {isError ? <Text> Wrong username or password </Text> : null}
      <Input
        containerStyle={styles.inputField}
        inputStyle={styles.inputText}
        autoFocus
        required
        placeholder="Notendanafn.."
        onChangeText={(username) => setUser({ ...user, username })}
      />
      <Input
        containerStyle={styles.inputField}
        inputStyle={styles.inputText}
        required
        secureTextEntry={true}
        placeholder="Lykilord.."
        onChangeText={(password) => setUser({ ...user, password })}
      />
      <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='Innskrá' onPress={() => handleAdd()} />
    </View>
    </>
  );
};
export default Login;
