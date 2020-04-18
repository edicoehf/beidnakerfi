import React, { useState } from 'react';
import {
  View, TouchableOpacity, ScrollView,
} from 'react-native';
import {
  Button, Text, Overlay, Icon,
} from 'react-native-elements';
import { useNavigation } from 'react-navigation-hooks';
import { useSelector } from 'react-redux';
import EdicoLogo from '../../Views/EdicoLogo';

// Styles
import styles from './style';
// service
import * as api from '../../service/apiGateway';

const CostSitePicker = () => {
  const { navigate } = useNavigation();
  const { userInfo } = useSelector((state) => state.userInfo);
  const [isVisible, setVisable] = useState(false);
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
              <TouchableOpacity onPress={() => setVisable(true)}>
                <View style={styles.defaultPick}>
                  <Text style={styles.costsiteText}>{selectedValue.name}</Text>
                  <View style={styles.rightMark}>
                    <Icon name="arrow-drop-down" />
                  </View>
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
                              <>
                                <Text style={styles.costsiteText}>{x.name}</Text>
                                <View style={styles.rightMark}>
                                  <Icon name="radio-button-checked" />
                                </View>
                              </>
                            ) : (
                              <Text style={styles.costsiteText}>{x.name}</Text>
                            )
                          }
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                </ScrollView>
              </Overlay>
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
