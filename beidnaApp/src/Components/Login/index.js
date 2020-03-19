import React, { useState } from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import {
  Input, Button, Overlay, Text, Avatar,
} from 'react-native-elements';

// Styles
import styles from './style';
// service
import { login } from '../../service/apiGateway.js'

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });

  const handleAdd = async () => {
    console.log(await login(user));
  };

  return (
    <View>

      <Text style={styles.header}>Innskraning</Text>
      <Input
        autoFocus
        required
        placeholder="Notendanafn.."
        onChangeText={(username) => setUser({ ...user, username })}
      />
      <Input
        required
        type="password"
        placeholder="Lykilord"
        onChangeText={(password) => setUser({ ...user, password })}
      />
      <Button style={styles.button} type="outline" title='Innskrá' onPress={() => handleAdd()} />
    </View>
  );
};
export default Login;
