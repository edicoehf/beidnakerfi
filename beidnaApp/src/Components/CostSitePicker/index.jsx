import React, { useState } from 'react';
import { View, Picker } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import { useSelector } from 'react-redux';



// Styles
import styles from './style';
// service
import * as api from '../../service/apiGateway.js'

const CostSitePicker = () => {
  const { navigate } = useNavigation();
  const { userInfo } = useSelector((state) => state.userInfo);
  const handleNewCheque = async () => {
    const newCheque = await api.generateCheque(userInfo.token, userInfo.id, selectedValue.id);
    navigate('NewCheque', { costsite: selectedValue, cheque: newCheque })
  }
  const [ selectedValue, setSelectedValue] = useState(userInfo.departments[0]);
  return (
    <View style={styles.container}>
      <Text>Veldu Kostnaðarstað</Text>
      <Picker
        selectedValue={selectedValue}
        style={styles.dropdown}
        mode='dialog'
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
      {
        userInfo.departments.map((x) => (
          <Picker.Item key={x.id} label={x.name} value={x} />
        ))
      }

      </Picker>
      <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='Opna beiðni' onPress={handleNewCheque} />
    </View>
  );
};
export default CostSitePicker;
