import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector } from 'react-redux';

import TopNavigator from '../TopNavigator';

// Styles
import styles from './style';

const UserDetails = () => {
  const { userInfo } = useSelector((state) => state.userInfo);
  return (
    <View style={styles.container}>
      <TopNavigator />
      <View style={styles.content}>
        <Text>
          Nafn:
          {userInfo.user}
        </Text>
        <Text>
          org id:
          {userInfo.org_id}
        </Text>
        <Text>Deildir: </Text>
        {
          userInfo ? (
            userInfo.departments.map((x) => (
              <Text key={x.id}>{x.name}</Text>
            ))
          ) : null

        }
      </View>
    </View>
  );
};
export default UserDetails;
