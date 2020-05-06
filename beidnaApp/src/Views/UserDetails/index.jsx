import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import ChangePasswordOverlay from '../Overlays/ChangePasswordOverlay';

import TopNavigator from '../TopNavigator';
import CostsiteOverlay from '../Overlays/CostsiteOverlay';

// Styles
import styles from './style';

const UserDetails = () => {
  const [isVisible, setVisible] = useState(false);
  const [isVisibleDep, setVisibleDep] = useState(false);
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
          departments.length > 1 ? (
            <>
              <TouchableOpacity onPress={() => setVisibleDep(true)}>
                <View style={styles.defaultPick}>
                  <Text style={styles.costsiteText}>{departments[0].name}</Text>
                  <View style={styles.rightMark}>
                    <Icon name="arrow-drop-down" />
                  </View>
                </View>
              </TouchableOpacity>
              <CostsiteOverlay
                departments={departments}
                visible={isVisibleDep}
                visibleFunc={setVisibleDep}
              />
            </>
          ) : (
            <View style={styles.oneCostsite}>
              <Text style={styles.costsiteText}>{departments.name}</Text>
            </View>
          )
        }
        <TouchableOpacity
          style={styles.changePW}
          onPress={() => {
            setVisible(true);
          }}
        >
          <Text style={styles.centerItem}>Breyta lykilorði</Text>
        </TouchableOpacity>
      </View>
      <ChangePasswordOverlay
        visible={isVisible}
        visibleFunc={setVisible}
      />
    </View>
  );
};
export default UserDetails;
