import React, { useState, useEffect } from 'react';
import '../Lists.css';
import { getUsers } from '../../../services/apiGateway';
import DisableUserButton from '../../DisableUserButton';

const StaffList = (props) => {

  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const getStaff = async () => {
      const results = await getUsers();

      setStaffList(results.data);
    }

    getStaff();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Departments</th>
          <th> </th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {
          staffList.filter(staff => {
            return staff.username.includes(props.query)
          }).map(staff => {
            return (
              <tr key={staff.id}>
                <td>{staff.username}</td>
                <td>{staff.email}</td>
                <td>
                  {
                    staff.departments.map(dept => {
                      return dept.name
                    }).join(', ')
                  }
                </td>
                <td><button>Breyta user</button></td>
                <td><DisableUserButton /></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

export default StaffList;
