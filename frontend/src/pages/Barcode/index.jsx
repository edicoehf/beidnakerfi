/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React from 'react';
import Barcode from 'react-barcode';
import './Barcode.css';

const BarcodeGenerator = (props) => {
  const { code } = props.match.params;
  return (
    <div className="barcode">
      <Barcode value={code} />
    </div>
  );
};

export default BarcodeGenerator;
