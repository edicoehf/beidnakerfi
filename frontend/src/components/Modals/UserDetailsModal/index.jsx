import React from 'react';
import './UserDetailsModal.css';
import UserDetailsForm from '../../Forms/UserDetailsForm';

const UserDetailsModal = (props) => (
  <div className="userDetailsModal">
    <div className="content-left">
      <h1> User Details Modal </h1>
      <UserDetailsForm />
    </div>
    <div className="buttons-right">
      <button type="button" className="save-changes-btn"> Loka/Opna Aðgang </button>
      <button type="button" className="save-changes-btn"> Change password </button>
    </div>

  </div>
);

export default UserDetailsModal;
