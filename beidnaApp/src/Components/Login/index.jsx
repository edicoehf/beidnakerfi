import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import { useDispatch } from 'react-redux';

import EdicoLogo from '../../Views/EdicoLogo';

// actions
import { setUserInfo } from '../../actions/userAction';
// Styles
import styles from './style';
// service
import * as api from '../../service/apiGateway';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [isError, setError] = useState(false);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const handleAdd = async () => {
    const loginInfo = await api.login(user);
    if (loginInfo.status === 200) {
      // dispatching userinfo into the store
      dispatch(await setUserInfo(loginInfo.data));
      // Cleaning out fields so info doesnt show after logout
      setUser({ username: '', password: '' });
      navigate('Landing');
      setError(false);
      // show error text if username or password fail.
    } else { setError(true); }
  };

  return (
    <View style={styles.container}>
      <EdicoLogo />
      <View style={styles.loginContainer}>
        {isError ? <Text> Rangt lykilorð </Text> : null}
        <Input
          containerStyle={styles.inputField}
          inputStyle={styles.inputText}
          autoCapitalize="none"
          required
          value={user.username}
          placeholder="Notendanafn.."
          onChangeText={(username) => setUser({ ...user, username })}
        />
        <Input
          containerStyle={styles.inputField}
          inputStyle={styles.inputText}
          value={user.password}
          required
          secureTextEntry
          placeholder="Lykilord.."
          onChangeText={(password) => setUser({ ...user, password })}
        />
        <View>
          <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title="Innskrá" onPress={() => handleAdd()} />
        </View>
      </View>
    </View>
  );
};
export default Login;
