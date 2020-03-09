import React from 'react';
import './ChequePage.css';

import ChequeForm from '../ChequeForm';
import ChequeList from '../ChequeList';

const ChequePage = () => {
  return (
    <div id="chequepage">
      <ChequeForm />
      <ChequeList />
    </div>
  )
}

export default ChequePage;
