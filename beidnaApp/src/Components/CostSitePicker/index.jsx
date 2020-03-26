import React, { useState } from 'react';
import { View, Picker } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';

import EdicoLogo from '../../Views/EdicoLogo';


// Styles
import styles from './style';
// service
import * as api from '../../service/apiGateway.js'

const CostSitePicker = () => {
  const tempCostSites = [{name:'Heima hja emil', id: 1}, {name:'Heima hja inga', id: 2}, {name:'Heima hja arnori', id: 3}]
  const [ selectedValue, setSelectedValue] = useState( tempCostSites[0].name)

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
        tempCostSites.map((x) => (
          <Picker.Item key={x.id} label={x.name} value={x.name}  />
        ))
      }

      </Picker>
      <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title='Opna beiðni' onPress={async () => await handleClick('0')} />
    </View>
  );
};
export default CostSitePicker;
