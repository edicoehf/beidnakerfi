// Dependencies
import React from 'react';

//Source
import { forms } from '../../config'

//Service
import { checkPrivileges } from '../../services';

//Components
import SellerSuperUser from './SellerSuperUser';
import BuyerSuperUser from './BuyerSuperUser';

const CreateUser = () => {
  return (
    <>
    { checkPrivileges(forms['SuperBuyer']) ? <BuyerSuperUser /> : null }
    { checkPrivileges(forms['SuperSeller']) ? <SellerSuperUser /> : null }
    </>
  );
};

export default CreateUser;
