import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import { useSelector } from 'react-redux';

import EdicoLogo from '../../Views/EdicoLogo';


// Styles
import styles from './style';
// service
import * as api from '../../service/apiGateway.js'

const Timer = () => {
  const [time, setTime] = useState(15);
  const [started, setStarted] = useState(false);
  const { state: { params : { cheque }} } = useNavigation();
  const { userInfo } = useSelector((state) => state.userInfo);
  const { navigate } = useNavigation();

  useEffect(() => {
    if(time > 0){
      setTimeout(() => {
      const tmpTime = (time => time - 1);
      setTime(tmpTime);
    }, 1000);
    } else {
      api.deleteCheque(userInfo.token, cheque.code)
      navigate('Landing')
    }
  }, [time]);
  return (
    <View style={styles.container}>
      <View style={styles.timebox}>
        <Text style={styles.timeText}>{ Math.floor(time/60) }</Text>
        <Text style={styles.timeDec}>Minútur</Text>
      </View>
      <View style={styles.timebox}>
        <Text style={styles.timeText}>{ time%60 }</Text>
        <Text style={styles.timeDec}>Sekúndur</Text>
      </View>
    </View>
    )
};
export default Timer;
