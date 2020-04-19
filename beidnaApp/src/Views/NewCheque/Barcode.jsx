import React, { useEffect, createRef, forwardRef } from 'react';
import JsBarcode from 'jsbarcode';
import Svg, { Image } from 'react-native-svg';
import PropTypes from 'prop-types';

// Styles
import styles from './style';

const Barcode = (props) => {
  var renderElement;
  useEffect(() => {
    new JsBarcode(renderElement, props.value, props);
    renderElement = createRef();
  });
  return (
    <Svg ref="renderElement"/>
  );
};
export default Barcode;

Barcode.propTypes = {
  value: PropTypes.string.isRequired,
  renderer: PropTypes.string,
  format: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  displayValue: PropTypes.bool,
  fontOptions: PropTypes.string,
  font: PropTypes.string,
  textAlign: PropTypes.string,
  textPosition: PropTypes.string,
  textMargin: PropTypes.number,
  fontSize: PropTypes.number,
  background: PropTypes.string,
  lineColor: PropTypes.string,
  margin: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
};

Barcode.defaultProps = {
  format: 'CODE128',
  renderer: 'svg',
  width: 2,
  height: 100,
  displayValue: true,
  fontOptions: '',
  font: 'monospace',
  textAlign: 'center',
  textPosition: 'bottom',
  textMargin: 2,
  fontSize: 20,
  background: '#ffffff',
  lineColor: '#000000',
  margin: 10,
};
