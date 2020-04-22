import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  Text, Overlay, Icon,
} from 'react-native-elements';
import PropTypes from 'prop-types';

// Styles
import styles from './style';

const ErrorOverlay = ({ errorText, visible, func }) => {
  useEffect(() => {
    func(visible);
  }, [visible]);
  return (
    <Overlay
      overlayStyle={styles.overlay}
      isVisible={visible}
      onBackdropPress={() => func(false)}
      borderRadius={25}
    >
      <>
        <View style={styles.closeModal}>
          <Icon name="close" onPress={() => func(false)} />
        </View>
        <View style={styles.modalText}>
          {
            errorText.map((x) => (
              <Text key={x}>{x}</Text>
            ))
          }
        </View>
      </>
    </Overlay>
  );
};
export default ErrorOverlay;

// TODO: add prop validation
