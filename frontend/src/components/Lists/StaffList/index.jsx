import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import '../Lists.css';
import { getUsers, getUser } from '../../../services/apiGateway';
import { sortBy } from '../../../services';


const StaffList = (props) => {
  const [staffList, setStaffList] = useState([]);
  const [desc, setDesc] = useState(true);

  useEffect(() => {
    const getStaff = async () => {
      const results = await getUsers();
      if (results.status === 200) {
        setStaffList(results.data.results);
      }
    };

    getStaff();
  }, []);

  const sort = async (item, subItem) => {
    const sorted = await sortBy(staffList, item, subItem, setDesc, desc);
    setStaffList(sorted);
  };
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
          <th onClick={() => sort('username')}>Notendanafn</th>
          <th onClick={() => sort('email')}>Netfang</th>
          <th onClick={() => sort('department', 'name')}>Deildir</th>
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
