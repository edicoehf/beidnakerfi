import React, { useEffect } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import {
  Text, Overlay, Icon,
} from 'react-native-elements';

// Styles
import styles from './style';

const CostsiteOverlay = (
  {
    departments, visible, value, visibleFunc, valueFunc,
  },
) => {
  useEffect(() => {
    visibleFunc(visible);
  }, [visible]);
  return (
    <Overlay
      overlayStyle={styles.overlay}
      isVisible={visible}
      onBackdropPress={() => visibleFunc(false)}
      borderRadius={25}
    >
      <ScrollView>
        {
          departments.map((x) => (
            <TouchableOpacity
              key={x.id}
              style={styles.costsitePicker}
              onPress={() => {
                valueFunc(x);
                visibleFunc(false);
              }}
            >
              <View style={styles.listItem}>
                {
                  x.id === value.id ? (
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
  );
};
export default CostsiteOverlay;
// CostsiteOverlay.propTypes = {
//   departments: PropTypes.bool.isRequired,
//   visible: PropTypes.bool.isRequired,
//   value: PropTypes.string,
//
// };
// TODO: add prop validation
