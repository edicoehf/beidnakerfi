import React from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';

import TopNavigator from '../TopNavigator';

// Styles
import styles from './style';

const UserDetails = () => {
  const {
    userInfo: {
      username, departments, email, organization,
    },
  } = useSelector((state) => state.userInfo);
  return (
    <View style={styles.container}>
      <TopNavigator />
      <View style={styles.content}>
        <Icon iconStyle={styles.userIcon} name="person" />
        <View style={styles.userItem}>
          <Text style={styles.itemDesc}>Nafn:</Text>
          <Text style={styles.itemUser}>{username}</Text>
        </View>
        <View style={styles.userItem}>
          <Text style={styles.itemDesc}>Email:</Text>
          <Text style={styles.itemUser}>{email}</Text>
        </View>
        {
          organization ? (
            <View style={styles.userItem}>
              <Text style={styles.itemDesc}>Fyrirtæki:</Text>
              <Text style={styles.itemUser}>{organization.name}</Text>
            </View>
          ) : null
        }
        <Text style={styles.userDepartmentDesc}>Deildir: </Text>
        {
          departments ? (
            departments.map((x) => (
              <Text style={styles.departmentItem} key={x.id}>{x.name}</Text>
            ))
          ) : null
        }
      </View>
    </View>
  );
};
export default UserDetails;
