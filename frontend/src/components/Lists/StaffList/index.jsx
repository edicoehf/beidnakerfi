import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import '../Lists.css';
import { getUsers } from '../../../services/apiGateway';


const StaffList = (props) => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const getStaff = async () => {
      const results = await getUsers();
      setStaffList(results.data);
    };

    getStaff();
  }, []);

  const handleClick = (uid) => {
    const { setDrawerOpen, setUserId } = props;

    setUserId(uid);
    setDrawerOpen(true);
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Departments</th>
        </tr>
      </thead>
      <tbody>
        {
          staffList.filter((staff) => staff.username.includes(props.query)).map((staff) => (
            <tr className="row" key={staff.id} onClick={() => handleClick(staff.id)}>
              <td>{staff.username}</td>
              <td>{staff.email}</td>
              <td>
                {
                  staff.departments.map((dept) => dept.name).join(', ')
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

StaffList.propTypes = {
  query: PropTypes.string.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
};

export default StaffList;
