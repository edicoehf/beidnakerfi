import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import '../Lists.css';
import { getUsers, getUser } from '../../../services/apiGateway';


const StaffList = (props) => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const getStaff = async () => {
      const results = await getUsers();
      if (results.status === 200) setStaffList(results.data);
    };

    getStaff();
  }, []);

  const handleClick = async (uid) => {
    const { setUser, setDrawerOpen } = props;

    const user = await getUser(uid);
    if (user.status) {
      setUser(user.data);
      setDrawerOpen(true);
    }
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
  setUser: PropTypes.func.isRequired,
};

export default StaffList;
