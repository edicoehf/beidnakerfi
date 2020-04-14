import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';

// Styles
import styles from './style';

const Timer = () => {
  const [time, setTime] = useState(300);
  const [started, setStarted] = useState(false);

  const { navigate } = useNavigation();

  useEffect(() => {

      var timer = setTimeout(() => {
        if(time > 0){
          const tmpTime = (time => time - 1);
          setTime(tmpTime);
        } else {
          navigate('Landing')
        }
      }, 1000);

    return () => clearTimeout(timer);
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
