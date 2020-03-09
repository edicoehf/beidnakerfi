// Dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Components
import Sidebar from '../../components/Sidebar';
import CreateUser from '../../components/CreateUserForms';
import ChequePage from '../../components/ChequePage';
import ChequeForm from '../../components/ChequeForm';
import EmployeeList from '../../components/EmployeeList';

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
        {page === 'Home' ? <ChequePage /> : null}
        {page === 'CreateUser' ? <CreateUser /> : null}
        {page === 'CreateCheque' ? <ChequeForm /> : null}
        {page === 'ViewUsers' ? <EmployeeList /> : null}
        {page === 'ViewCustomers' ? <CustomerList /> : null}
      </div>
    </div>
  );
};


export default Main;
