import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Text, Overlay } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import { useSelector } from 'react-redux';

// Styles
import styles from './style';
// service
import * as api from '../../service/apiGateway';

const CostSitePicker = () => {
  const { navigate } = useNavigation();
  const { userInfo } = useSelector((state) => state.userInfo);
  const [isVisible, setVisable] = useState(false);
  // Laga thannig thad se haegt ad sja value i byrjun
  const [selectedValue, setSelectedValue] = useState('');
  const handleNewCheque = async () => {
    if (selectedValue !== '') {
      const newCheque = await api.generateCheque(userInfo.token, userInfo.id, selectedValue.id);
      navigate('NewCheque', { costsite: selectedValue, cheque: newCheque });
    } else {
      // TODO: ERROR WHEN NOTHING selected
      console.log('ekkert valid')
    }

  };

  return (
    <View style={styles.container}>
      <Text>Veldu Kostnaðarstað</Text>
      <TouchableOpacity onPress={() => setVisable(true)}>
        <View style={styles.defaultPick}>
          <Text style={styles.costsiteText}>{selectedValue.name}</Text>
          <Text style={styles.downArrow}>icon or</Text>
        </View>
      </TouchableOpacity>
      <Overlay
        overlayStyle={styles.overlay}
        isVisible={isVisible}
        onBackdropPress={() => setVisable(false)}
        borderRadius={25}
      >
        <ScrollView>
          {
            userInfo ? (
              userInfo.departments.map((x) => (
                <TouchableOpacity
                  key={x.id}
                  style={styles.costsitePicker}
                  onPress={() => {
                    setSelectedValue(x);
                    setVisable(false);
                  }}
                >
                  <View style={styles.listItem}>
                    {
                      x.id === selectedValue.id ? (
                        <Text style={(styles.costsiteText, styles.selected)}>{x.name}</Text>
                      ) : (
                        <Text style={styles.costsiteText}>{x.name}</Text>
                      )
                    }
                  </View>
                </TouchableOpacity>

              ))
            ) : null
          }
        </ScrollView>
      </Overlay>
      <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title="Opna beiðni" onPress={handleNewCheque} />
    </View>
  );
};
export default CostSitePicker;
