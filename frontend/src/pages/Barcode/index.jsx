/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React from 'react';
import Barcode from 'react-barcode';

const BarcodeGenerator = (props) => {
  const { code } = props.match.params.code;
  return (
    <Barcode value={code} />
  );
};

export default BarcodeGenerator;
