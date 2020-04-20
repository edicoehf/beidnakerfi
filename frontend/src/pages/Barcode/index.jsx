/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import Barcode from 'react-barcode';

const BarcodeGenerator = (props) => {
  const { code } = props.match.params.code;
  return (
    <Barcode value={code} />
  );
};

BarcodeGenerator.propTypes = {
  code: PropTypes.number.isRequired,
};

export default BarcodeGenerator;
