import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux'
import { useNavigation } from 'react-navigation-hooks';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { deleteCheque } from '../../service/apiGateway';
// Styles
import styles from './style';

const Timer = () => {
  const startTime = 300;
  const dropPerSecond = 100 / startTime;
  const [time, setTime] = useState(startTime);
  const [animation, setAnimation] = useState(100);

  const { state: { routeName, params }, navigate } = useNavigation();
  const { userInfo } = useSelector((state) => state.userInfo);
  const clearcheck = async () => {
    await deleteCheque(userInfo.token, params.cheque.code);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
        setAnimation(animation - dropPerSecond * 2);
      } else {
        navigate('Landing');
        clearcheck();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [time]);

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={250}
        width={20}
        rotation={360}
        fill={animation}
        duration={animation}
        tintColor="#8D8D8D"
        backgroundColor="darkred"
      >
        {
          (fill) => ( // eslint-disable-line no-unused-vars
            <View style={styles.timebox}>
              <Text style={styles.timeText}>
                {
                  Math.floor(time / 60)
                }
              </Text>
              <Text style={styles.timeDec}>Minútur</Text>
              <Text style={styles.timeText}>
                {
                  time % 60
                }
              </Text>
              <Text style={styles.timeDec}>Sekúndur</Text>
            </View>
          )
        }
      </AnimatedCircularProgress>
    </View>
  );
};
export default Timer;
