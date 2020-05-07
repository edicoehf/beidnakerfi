import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import { useSelector } from 'react-redux';

import EdicoLogo from '../../Views/EdicoLogo';
import CostsiteOverlay from '../../Views/Overlays/CostsiteOverlay';

// Styles
import styles from './style';
// service
import * as api from '../../service/apiGateway';

const CostSitePicker = () => {
  const { navigate } = useNavigation();
  const { userInfo } = useSelector((state) => state.userInfo);
  const [isVisible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(userInfo !== '' ? userInfo.departments[0] : '');
  const handleNewCheque = async () => {
    const newCheque = await api.generateCheque(userInfo.token, userInfo.id, selectedValue.id);
    navigate('NewCheque', { costsite: selectedValue, cheque: newCheque });

  };

  return (
    <>
      <EdicoLogo />
      <View style={styles.container}>
        <Text style={styles.font}>Opna nýja beiðni fyrir:</Text>
        {
          userInfo && userInfo.departments.length > 1 ? (
            <>
              <TouchableOpacity onPress={() => setVisible(true)}>
                <View style={styles.defaultPick}>
                  <Text style={styles.costsiteText}>{selectedValue.name}</Text>
                  <View style={styles.rightMark}>
                    <Icon name="arrow-drop-down" />
                  </View>
                </View>
              </TouchableOpacity>
              <CostsiteOverlay
                departments={userInfo.departments}
                visible={isVisible}
                value={selectedValue}
                visibleFunc={setVisible}
                valueFunc={setSelectedValue}
              />
            </>
          ) : (
            <View style={styles.oneCostsite}>
              <Text style={styles.costsiteText}>{selectedValue.name}</Text>
            </View>
          )
        }
        <View>
          <Button buttonStyle={styles.button} titleStyle={styles.buttonTitle} title="Opna beiðni" onPress={handleNewCheque} />
        </View>
      </View>
    </>
  );
};
export default CostSitePicker;
