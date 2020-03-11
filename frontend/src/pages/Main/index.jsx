// Dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Components
import Sidebar from '../../components/Sidebar';
import CreateUser from '../../components/Forms/CreateUserForms';
import ChequeListContainer from '../../components/Containers/ChequeListContainer';
import NewChequeContainer from '../../components/Containers/NewChequeContainer';
import StaffListContainer from '../../components/Containers/StaffListContainer';

// Style
import './Main.css';
import CustomerList from '../../components/Lists/CustomerList';

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
