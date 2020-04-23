import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import { useDispatch } from 'react-redux';

import EdicoLogo from '../../Views/EdicoLogo';
import ErrorOverlay from '../../Views/Overlays/ErrorOverlay';

// actions
import { setUserInfo } from '../../actions/userAction';
// Styles
import styles from './style';
// service
import * as api from '../../service/apiGateway';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [isError, setError] = useState(false);
  const [errorText, setErrorText] = useState(['']);
  const [isVisible, setVisible] = useState(false);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const handleAdd = async () => {
    const { status, data: { org_seller: seller, id, token } } = await api.login(user);
    if (!seller) {
      if (status === 200) {
        const userInfo = await api.getUserInfo(token, id);
        if (userInfo.departments.length > 0) {
          // dispatching userinfo into the store
          userInfo.token = token;
          dispatch(await setUserInfo(userInfo));
          // Cleaning out fields so info doesnt show after logout
          setUser({ username: '', password: '' });
          navigate('Landing');
          // show error text if username or password fail.
          setError(false);
        } else {
          setErrorText(['Þú ert ekki skráður í neina deild', 'Vinsamlegast hafðu samband við deildarstjóra.']);
          setVisible(true);
        }
      } else { setError(true); }
    } else {
      setErrorText(['Þetta app er engöngu fyrir kaupendur', 'Aðgangur þinn er skráður sem seljanda aðgangur']);
      setVisible(true);
    }
  };
  return (
    <>
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
      <ErrorOverlay errorText={errorText} visible={isVisible} visibleFunc={setVisible} />
    </>
  );
};
export default Login;
