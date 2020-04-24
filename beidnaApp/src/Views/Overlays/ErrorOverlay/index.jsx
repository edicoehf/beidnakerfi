import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Text, Overlay, Icon,
} from 'react-native-elements';
import PropTypes from 'prop-types';

// Styles
import styles from './style';

const ErrorOverlay = ({ errorText, visible, visibleFunc }) => {
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
      <>
        <View style={styles.closeModal}>
          <TouchableOpacity
            style={styles.iconPress}
            onPress={() => visibleFunc(false)}
          >
            <Icon name="close" />
          </TouchableOpacity>
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

ErrorOverlay.propTypes = {
  errorText: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  visible: PropTypes.bool.isRequired,
  visibleFunc: PropTypes.func.isRequired,
};
