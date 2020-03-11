// Dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Components
import Sidebar from '../../components/Sidebar';
import CreateUser from '../../components/CreateUserForms';
import ChequeListContainer from '../../components/ChequeListContainer';
import NewChequeContainer from '../../components/NewChequeContainer';
import StaffListContainer from '../../components/StaffListContainer';

// Style
import './Main.css';
import CustomerList from '../../components/CustomerList';

const Main = () => {
  const page = useSelector((state) => state.page);
  return (
    <div id="mainGrid">
      <div id="sidebar">
        <Sidebar />
      </div>
      <div id="content">
        {page === 'Home' ? <ChequeListContainer /> : null}
        {page === 'CreateUser' ? <CreateUser /> : null}
        {page === 'CreateCheque' ? <NewChequeContainer /> : null}
        {page === 'ViewUsers' ? <StaffListContainer /> : null}
        {page === 'ViewCustomers' ? <CustomerList /> : null}
      </div>
    </div>
  );
};


export default Main;
