import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Text, Overlay, Icon, Input,
} from 'react-native-elements';
import PropTypes from 'prop-types';

// Styles
import styles from './style';

const ChangePasswordOverlay = ({ visible, visibleFunc }) => {
  const [user, setUser] = useState({ prevPW: '', newPW: '', confirmPW: '' });
  useEffect(() => {
    visibleFunc(visible);
  }, [visible]);
  return (
    <Overlay
      overlayStyle={styles.overlay}
      isVisible={visible}
      onBackdropPress={() => visibleFunc(false)}
      borderRadius={25}
    >
      <>
        <View style={styles.closeModal}>
          <Icon name="close" onPress={() => visibleFunc(false)} />
        </View>
        <View style={styles.modalText}>
          <Text>Núverandi lykilorð</Text>
          <Input
            containerStyle={styles.inputField}
            inputStyle={styles.inputText}
            value={user.prevPW}
            required
            secureTextEntry
            placeholder="Lykilord.."
            onChangeText={(prevPW) => setUser({ ...user, prevPW })}
          />
          <Text>Nýtt lykilorð</Text>
          <Input
            containerStyle={styles.inputField}
            inputStyle={styles.inputText}
            value={user.newPW}
            required
            secureTextEntry
            placeholder="Lykilord.."
            onChangeText={(newPW) => setUser({ ...user, newPW })}
          />
          <Text>Staðfesta lykilorðið</Text>
          <Input
            containerStyle={styles.inputField}
            inputStyle={styles.inputText}
            value={user.confirmPW}
            required
            secureTextEntry
            placeholder="Lykilord.."
            onChangeText={(confirmPW) => setUser({ ...user, confirmPW })}
          />
          <TouchableOpacity
            style={styles.changePW}
            onPress={() => {
              setVisible(true);
            }}
          >
            <Text style={styles.centerItem}>Breyta lykilorði</Text>
          </TouchableOpacity>
        </View>
      </>
    </Overlay>
  );
};
export default ChangePasswordOverlay;

// TODO: add prop validation
