import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Text, Overlay, Icon, Input,
} from 'react-native-elements';
import { useSelector } from 'react-redux';
// Service
import * as api from '../../../service/apiGateway';
// Styles
import styles from './style';

const ChangePasswordOverlay = ({ visible, visibleFunc }) => {
  const [user, setUser] = useState({ prevPW: '', newPW: '', confirmPW: '' });
  const [isErrorNotEqual, setErrorNotEqual] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const [isErrorWrongPrev, setErrorWrongPrev] = useState(false);
  const { userInfo } = useSelector((state) => state.userInfo);
  useEffect(() => {
    visibleFunc(visible);
    setComplete(false);
  }, [visible]);
  const submitChange = async () => {
    setComplete(false);
    setErrorWrongPrev(false);
    if (user.newPW === user.confirmPW) {
      setErrorNotEqual(false);
      const changePwResp = await api.changePW(userInfo.token, userInfo.id, user.prevPW, user.newPW);
      if (changePwResp.success) {
        setComplete(true);
      } else {
        setErrorWrongPrev(true);
      }
    } else {
      setErrorNotEqual(true);
    }
  };
  return (
    <Overlay
      overlayStyle={styles.overlay}
      isVisible={visible}
      onBackdropPress={() => visibleFunc(false)}
      borderRadius={25}
    >
      <>
        <View style={styles.closeModal}>
          <TouchableOpacity
            style={styles.iconPress}
            onPress={() => visibleFunc(false)}
          >
            <Icon name="close" />
          </TouchableOpacity>
        </View>
        {
          !isComplete ? (
            <View style={styles.modalContent}>
              {
                isErrorWrongPrev ? <Text style={styles.redText}>Rangt lykilorð</Text> : null
              }
              <Input
                containerStyle={styles.inputField}
                inputStyle={styles.inputTextError}
                value={user.prevPW}
                required
                secureTextEntry
                placeholder="Núverandi lykilorð"
                onChangeText={(prevPW) => setUser({ ...user, prevPW })}
              />
              <Input
                containerStyle={styles.inputField}
                inputStyle={styles.inputText}
                value={user.newPW}
                required
                secureTextEntry
                placeholder="Nýtt lykilorð"
                onChangeText={(newPW) => setUser({ ...user, newPW })}
              />
              {
                isErrorNotEqual ? <Text style={styles.redText}>Lykilorð ekki eins</Text> : null
              }
              <Input
                containerStyle={styles.inputField}
                inputStyle={styles.inputText}
                value={user.confirmPW}
                required
                secureTextEntry
                placeholder="Staðfesta lykilorð.."
                onChangeText={(confirmPW) => setUser({ ...user, confirmPW })}
              />
              <TouchableOpacity
                style={styles.changePW}
                onPress={() => {
                  submitChange();
                }}
              >
                <Text style={styles.centerItem}>Breyta lykilorði</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.modalContent}>
              <Icon iconStyle={styles.checkIcon} name="check-circle" />
            </View>
          )
        }
      </>
    </Overlay>
  );
};
export default ChangePasswordOverlay;

// TODO: add prop validation
